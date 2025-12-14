import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSocket } from '../../context/SocketProvider';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUsers, FaUser, FaPlus, FaSearch, FaBars, FaCheck, FaCheckDouble, FaCog, FaPaperclip, FaCalendarAlt, FaVideo, FaVideoSlash, FaPhoneSlash, FaMicrophone, FaMicrophoneSlash, FaPhoneAlt, FaArrowLeft } from 'react-icons/fa';
import Peer from 'peerjs';

const Chat = () => {
    const socket = useSocket();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // State
    const [myGroups, setMyGroups] = useState([]); // All joined groups/DMs
    const [publicGroups, setPublicGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null); // { _id, name, ... }
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [tempAttachment, setTempAttachment] = useState(null); // { url, type }

    // Video/Audio Call State
    const [myPeer, setMyPeer] = useState(null);
    const [myPeerId, setMyPeerId] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null); // { fromEmail, signalData/peerId, callType }
    const [callType, setCallType] = useState('video'); // 'video' | 'audio'
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const remoteVideoRef = useRef(null);
    const localVideoRef = useRef(null);
    const currentCallRef = useRef(null);

    // Call Controls State
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const timerRef = useRef(null);

    // UI State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("my-groups"); // 'my-groups', 'dms', 'explore'
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    // ... (rest of imports/state)

    // Call Timer Effect
    useEffect(() => {
        if (callActive) {
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            setCallDuration(0);
        }
        return () => clearInterval(timerRef.current);
    }, [callActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
            setIsVideoOff(!isVideoOff);
        }
    };

    // ... (rest of logic)

    // Form State
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDesc, setNewGroupDesc] = useState("");
    const [dmReceiverEmail, setDmReceiverEmail] = useState("");

    const messagesEndRef = useRef(null);

    // Derived Lists
    const myGroupList = myGroups.filter(g => g.type !== 'dm');
    const myDmList = myGroups.filter(g => g.type === 'dm');

    // Initial Fetch
    useEffect(() => {
        if (user?.email) {
            fetchMyGroups();
        }
    }, [user?.email]);

    const fetchMyGroups = async () => {
        try {
            const res = await axiosSecure.get(`/groups/my-groups?email=${user.email}`);
            setMyGroups(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPublicGroups = async () => {
        try {
            const res = await axiosSecure.get('/groups');
            setPublicGroups(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // --- Selection & Socket Logic ---

    const handleSelectGroup = async (group) => {
        if (!group) return;

        setSelectedGroup(group);
        setMessages([]);
        setIsSidebarOpen(false);
        setShowAdminPanel(false);

        // Join socket room
        if (socket) {
            console.log("Joining room:", group._id);
            socket.emit("join_room", group._id);
            // Mark as read immediately on join
            socket.emit("mark_read", { room: group._id, email: user.email });
        }

        // Fetch History
        try {
            const res = await axiosSecure.get(`/messages/${group._id}`);
            setMessages(res.data);

            // Mark fetched messages as read in DB
            await axiosSecure.patch('/messages/read', { room: group._id, email: user.email });

            // Scroll will happen via useEffect on 'messages' change
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    // Socket Listeners
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (data) => {
            console.log("Received message:", data);
            if (selectedGroup && data.room === selectedGroup._id) {
                setMessages((prev) => {
                    // Deduplicate Check
                    if (prev.some(m => m._id === data._id)) return prev;
                    if (prev.some(m => m.uniqueId === data.uniqueId)) return prev; // If we used uniqueId

                    return [...prev, data];
                });

                // Scroll handled by useEffect

                // If I'm looking at this room, mark as read
                if (document.visibilityState === 'visible') {
                    socket.emit("mark_read", { room: selectedGroup._id, email: user.email });
                    axiosSecure.patch('/messages/read', { room: selectedGroup._id, email: user.email });
                }
            }
        };

        const handleNewGroup = () => {
            fetchMyGroups();
        };

        const handleReadUpdate = (data) => {
            // data: { room, email }
            if (selectedGroup && data.room === selectedGroup._id) {
                // Update local messages to show they are read by this person
                setMessages(prev => prev.map(msg => {
                    if (msg.author !== data.email && !msg.readBy?.includes(data.email)) {
                        return { ...msg, readBy: [...(msg.readBy || []), data.email] };
                    }
                    return msg;
                }));
            }
        };

        socket.on("receive_message", handleMessage);
        socket.on("user_read_messages", handleReadUpdate);
        socket.on("new_group", handleNewGroup);

        return () => {
            socket.off("receive_message", handleMessage);
            socket.off("user_read_messages", handleReadUpdate);
            socket.off("new_group", handleNewGroup);
        };
    }, [socket, selectedGroup]);

    const [previewImage, setPreviewImage] = useState(null);

    // Auto-scroll on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axiosSecure.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // res.data = { url, public_id, resource_type, format }
            setTempAttachment({
                url: res.data.url,
                type: res.data.resource_type === 'image' ? 'image' : 'file'
            });
        } catch (err) {
            console.error("Upload failed", err);
            Swal.fire("Error", "File upload failed", "error");
        } finally {
            setIsUploading(false);
        }
    };

    const sendMessage = async () => {
        if ((currentMessage.trim() === "" && !tempAttachment) || !selectedGroup) return;

        const messageData = {
            room: selectedGroup._id,
            author: user.email,
            message: currentMessage,
            attachment: tempAttachment,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            readBy: []
        };

        if (socket) {
            await socket.emit("send_message", messageData);
            setMessages((list) => [...list, messageData]);
            setCurrentMessage("");
            setTempAttachment(null); // Clear attachment after sending
        }
    };

    const handleCreateGroup = async () => {
        if (!newGroupName) return;
        try {
            const payload = {
                name: newGroupName,
                description: newGroupDesc,
                adminEmail: user.email,
                isPublic: true,
                type: 'group'
            };
            const res = await axiosSecure.post('/groups', payload);
            if (res.data.insertedId) {
                Swal.fire("Success", "Group created!", "success");
                setNewGroupName("");
                setNewGroupDesc("");
                document.getElementById('create_group_modal').close();
                fetchMyGroups();
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to create group", "error");
        }
    };

    const handleStartDM = async () => {
        if (!dmReceiverEmail) return;
        if (dmReceiverEmail === user.email) return Swal.fire("Error", "Cannot cancel yourself", "error");

        try {
            const res = await axiosSecure.post('/groups/dm', {
                senderEmail: user.email,
                receiverEmail: dmReceiverEmail
            });
            setDmReceiverEmail("");
            document.getElementById('start_dm_modal').close();
            fetchMyGroups();
            // Optionally auto-select: handleSelectGroup({...res.data, _id: res.data._id || res.data.insertedId});
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to start DM", "error");
        }
    };

    // Schedule State
    const [scheduleTopic, setScheduleTopic] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");

    const handleCreateSession = async () => {
        if (!scheduleTopic || !scheduleDate || !scheduleTime || !selectedGroup) return;

        // Combine date and time
        const startDateTime = new Date(`${scheduleDate}T${scheduleTime}`);

        try {
            await axiosSecure.post('/sessions', {
                groupId: selectedGroup._id,
                topic: scheduleTopic,
                startTime: startDateTime,
                createdBy: user.name,
                createdByEmail: user.email
            });

            Swal.fire("Success", "Session Scheduled!", "success");
            setScheduleTopic("");
            setScheduleDate("");
            setScheduleTime("");
            document.getElementById('schedule_modal').close();
            // detailed message will arrive via socket
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to schedule session", "error");
        }
    };



    const handleRSVP = async (sessionId) => {
        try {
            const res = await axiosSecure.post('/sessions/rsvp', { sessionId, email: user.email });
            const updatedSession = res.data;

            // Update local messages state to reflect new participant count (if we displayed it)
            // For now, just show success
            const isJoined = updatedSession.participants.includes(user.email);
            Swal.fire(isJoined ? "Joined" : "Left", `You have ${isJoined ? 'joined' : 'left'} the session.`, "success");

        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to RSVP", "error");
        }
    };

    const handleJoinRequest = async (group) => {
        try {
            await axiosSecure.post('/groups/request-join', { groupId: group._id, email: user.email });
            Swal.fire("Sent", "Join request sent to admin", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to send request", "error");
        }
    };

    // --- Video/Audio Call Logic ---

    // Initialize Peer (useEffect) - reusing existing logic structure but need to update the peer.on('call') handler to respect callType
    // Since callType state inside the listener might be stale due to closure, we need to use a Ref or be careful.
    // Actually better to determine constraints dynamically or save callType in a ref.
    const callTypeRef = useRef('video');

    useEffect(() => {
        callTypeRef.current = callType;
    }, [callType]);

    // Initialize Peer
    useEffect(() => {
        const peer = new Peer(undefined, {
            // You can use a specific host/port if you deployed your own PeerServer
            // host: '/', port: '3001'
        });

        peer.on('open', (id) => {
            console.log('My Peer ID:', id);
            setMyPeerId(id);
            setMyPeer(peer);
        });

        // Answer incoming PeerJS call
        peer.on('call', (call) => {
            // Determine constraints based on what type of call we accepted
            // The `incomingCall` state might have helped set callTypeRef
            const constraints = {
                video: callTypeRef.current === 'video',
                audio: true
            };

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                setLocalStream(stream);
                if (localVideoRef.current) localVideoRef.current.srcObject = stream;

                call.answer(stream); // Answer the call with an A/V stream.
                currentCallRef.current = call;
                setCallActive(true);

                call.on('stream', (remoteStream) => {
                    setRemoteStream(remoteStream);
                    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
                });

                call.on('close', () => {
                    endCallCleanup();
                });
            }).catch(err => {
                console.error("Failed to get local stream", err);
            });
        });

        return () => {
            peer.destroy();
        };
    }, []);

    // Socket Events for Signaling
    useEffect(() => {
        if (!socket) return;

        socket.on("incoming_call", (data) => {
            // data: { fromEmail, fromPeerId, callType }
            console.log("Incoming call from", data.fromEmail, data.callType);
            setIncomingCall(data);
            setCallType(data.callType || 'video'); // Set state so our answer logic knows
        });

        socket.on("call_accepted", (data) => {
            // data: { peerId }
            console.log("Call accepted by", data.peerId);
            // Initiate the actual media connection now that we know they accepted
            startPeerConnection(data.peerId);
        });

        socket.on("call_rejected", () => {
            Swal.fire("Busy", "User declined the call", "info");
            endCallCleanup();
        });

        socket.on("call_ended", () => {
            endCallCleanup();
        });

        return () => {
            socket.off("incoming_call");
            socket.off("call_accepted");
            socket.off("call_rejected");
            socket.off("call_ended");
        };
    }, [socket, myPeer, localStream]); // Dependencies

    const startVideoCall = () => {
        initiateCall('video');
    };

    const startAudioCall = () => {
        initiateCall('audio');
    };

    const initiateCall = (type) => {
        if (!selectedGroup || selectedGroup.type !== 'dm') return;
        const otherEmail = selectedGroup.members.find(m => m !== user.email);
        if (!otherEmail) return;

        setCallType(type);

        // Emit signal
        socket.emit("outgoing_call", {
            toEmail: otherEmail,
            fromEmail: user.email,
            fromPeerId: myPeerId,
            callType: type
        });

        Swal.fire({
            title: `Calling ${otherEmail}...`,
            text: type === 'audio' ? 'Audio Call' : 'Video Call',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    };

    const acceptCall = () => {
        if (!incomingCall) return;
        // incomingCall already set callType state via useEffect
        setIncomingCall(null);
        // setCallActive(true); // wait for stream

        socket.emit("accept_call", {
            toEmail: incomingCall.fromEmail,
            peerId: myPeerId
        });
    };

    const rejectCall = () => {
        if (!incomingCall) return;
        socket.emit("reject_call", { toEmail: incomingCall.fromEmail });
        setIncomingCall(null);
    };

    const startPeerConnection = (remotePeerId) => {
        Swal.close(); // Close "Calling..." modal
        setCallActive(true);

        const constraints = {
            video: callType === 'video',
            audio: true
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            setLocalStream(stream);
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;

            const call = myPeer.call(remotePeerId, stream);
            currentCallRef.current = call;

            call.on('stream', (remoteStream) => {
                setRemoteStream(remoteStream);
                if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
            });

            call.on('close', () => {
                endCallCleanup();
            });

        }).catch(err => {
            console.error("Failed to get local stream", err);
            Swal.fire("Error", "Could not access media devices", "error");
        });
    };

    const endCall = () => {
        const otherEmail = selectedGroup?.members?.find(m => m !== user.email) || incomingCall?.fromEmail;
        if (otherEmail) {
            socket.emit("end_call", { toEmail: otherEmail });
        }

        if (currentCallRef.current) currentCallRef.current.close();
        endCallCleanup();
    };

    const endCallCleanup = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setLocalStream(null);
        setRemoteStream(null);
        setCallActive(false);
        setIncomingCall(null);
        currentCallRef.current = null;
    };

    // --- End Video Logic ---

    const handleApproveJoin = async (groupId, applicantEmail) => {
        try {
            await axiosSecure.post('/groups/approve-join', {
                groupId,
                applicantEmail,
                adminEmail: user.email
            });
            Swal.fire("Approved", `${applicantEmail} added to group`, "success");
            // Refresh Selected Group to update members list UI if needed
            // Ideally we should update local state:
            setMyGroups(prev => prev.map(g => {
                if (g._id === groupId) {
                    return {
                        ...g,
                        members: [...g.members, applicantEmail],
                        joinRequests: g.joinRequests.filter(e => e !== applicantEmail)
                    }
                }
                return g;
            }));
            if (selectedGroup && selectedGroup._id === groupId) {
                setSelectedGroup(prev => ({
                    ...prev,
                    members: [...prev.members, applicantEmail],
                    joinRequests: prev.joinRequests.filter(e => e !== applicantEmail)
                }));
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to approve", "error");
        }
    };

    // --- Renders ---

    return (
        <div className="flex h-[calc(100dvh-4rem)] bg-base-100 relative overflow-hidden">



            {/* Sidebar */}
            <div className={`
                flex-col border-r border-base-300 bg-base-200 h-full
                ${selectedGroup ? 'hidden lg:flex lg:w-80' : 'flex w-full lg:w-80'}
            `}>
                <div className="p-4 border-b border-base-300">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaUsers /> Chat
                    </h2>

                    {/* Tabs */}
                    <div className="tabs tabs-boxed mt-4 grid grid-cols-3">
                        <a className={`tab text-xs ${activeTab === 'my-groups' ? 'tab-active' : ''}`} onClick={() => setActiveTab('my-groups')}>Groups</a>
                        <a className={`tab text-xs ${activeTab === 'dms' ? 'tab-active' : ''}`} onClick={() => setActiveTab('dms')}>DMs</a>
                        <a className={`tab text-xs ${activeTab === 'explore' ? 'tab-active' : ''}`} onClick={() => { setActiveTab('explore'); fetchPublicGroups(); }}>Explore</a>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {/* My Groups Tab */}
                    {activeTab === 'my-groups' && (
                        <>
                            {myGroupList.length === 0 && <p className="text-sm opacity-50 text-center">No groups joined.</p>}
                            {myGroupList.map(group => (
                                <div key={group._id} onClick={() => handleSelectGroup(group)}
                                    className={`p-3 rounded-lg cursor-pointer hover:bg-base-300 transition-colors ${selectedGroup?._id === group._id ? 'bg-primary text-primary-content' : 'bg-base-100'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold">{group.name}</h3>
                                        {group.joinRequests?.length > 0 && group.members.includes(user.email) && (
                                            <div className="badge badge-warning badge-xs">Request</div>
                                        )}
                                    </div>
                                    <p className="text-xs opacity-70 truncate">{group.description}</p>
                                </div>
                            ))}
                            <button className="btn btn-outline btn-block btn-sm mt-4" onClick={() => document.getElementById('create_group_modal').showModal()}>
                                <FaPlus /> Create Group
                            </button>
                        </>
                    )}

                    {/* DMs Tab */}
                    {activeTab === 'dms' && (
                        <>
                            {myDmList.length === 0 && <p className="text-sm opacity-50 text-center">No conversations yet.</p>}
                            {myDmList.map(group => {
                                // Display Name: The other person's email
                                const otherEmail = group.members.find(m => m !== user.email) || "Myself";
                                return (
                                    <div key={group._id} onClick={() => handleSelectGroup(group)}
                                        className={`p-3 rounded-lg cursor-pointer hover:bg-base-300 transition-colors flex items-center gap-3 ${selectedGroup?._id === group._id ? 'bg-primary text-primary-content' : 'bg-base-100'}`}
                                    >
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                <span className="text-xs">{otherEmail[0].toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <h3 className="font-bold truncate">{otherEmail}</h3>
                                        </div>
                                    </div>
                                );
                            })}
                            <button className="btn btn-outline btn-block btn-sm mt-4" onClick={() => document.getElementById('start_dm_modal').showModal()}>
                                <FaUser /> Start DM
                            </button>
                        </>
                    )}

                    {/* Explore Tab */}
                    {activeTab === 'explore' && (
                        <>
                            {publicGroups.map(group => {
                                const isMember = group.members?.includes(user?.email);
                                const isPending = group.joinRequests?.includes(user?.email);

                                return (
                                    <div key={group._id} className="p-3 bg-base-100 rounded-lg border border-base-300 flex justify-between items-center">
                                        <div className="overflow-hidden">
                                            <h3 className="font-bold truncate">{group.name}</h3>
                                            <p className="text-xs opacity-70">{group.members?.length || 0} members</p>
                                        </div>
                                        {isMember ? (
                                            <span className="badge badge-success badge-sm">Joined</span>
                                        ) : isPending ? (
                                            <span className="badge badge-ghost badge-sm">Pending</span>
                                        ) : (
                                            <button
                                                className="btn btn-xs btn-primary"
                                                onClick={() => group.isPrivate ? handleJoinRequest(group) : handleJoinGroup(group)}
                                            >
                                                {group.isPrivate ? 'Request' : 'Join'}
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`
                flex-col h-full bg-base-100 
                ${selectedGroup ? 'flex w-full flex-1' : 'hidden lg:flex lg:flex-1'}
            `}>
                {selectedGroup ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-base-300 flex items-center px-4 lg:px-6 bg-base-100/90 backdrop-blur justify-between z-10">
                            <div className="flex items-center gap-2">
                                {/* Mobile Back Button */}
                                <button
                                    className="lg:hidden btn btn-ghost btn-circle btn-sm mr-1"
                                    onClick={() => setSelectedGroup(null)}
                                >
                                    <FaArrowLeft />
                                </button>

                                <div className="flex flex-col">
                                    <h3 className="font-bold text-lg">
                                        {selectedGroup.type === 'dm'
                                            ? (selectedGroup.members.find(m => m !== user.email) || "Direct Message")
                                            : selectedGroup.name}
                                    </h3>
                                    <p className="text-xs opacity-50">
                                        {selectedGroup.type === 'group' ? `${selectedGroup.members?.length} members` : 'Private Conversation'}
                                    </p>
                                </div>
                            </div>

                            {/* Admin Panel Toggle */}
                            <div className="flex gap-2">
                                {selectedGroup.type === 'dm' && (
                                    <>
                                        <button className="btn btn-ghost btn-circle text-primary" onClick={startAudioCall}>
                                            <div className="indicator">
                                                <FaPhoneAlt />
                                            </div>
                                        </button>
                                        <button className="btn btn-ghost btn-circle text-error" onClick={startVideoCall}>
                                            <div className="indicator">
                                                <FaVideo />
                                            </div>
                                        </button>
                                    </>
                                )}

                                <button className="btn btn-ghost btn-circle" onClick={() => document.getElementById('schedule_modal').showModal()}>
                                    <div className="indicator">
                                        <FaCalendarAlt />
                                    </div>
                                </button>
                                {selectedGroup.type === 'group' && selectedGroup.members[0] === user.email && (
                                    <button className="btn btn-ghost btn-circle" onClick={() => setShowAdminPanel(!showAdminPanel)}>
                                        <div className="indicator">
                                            <FaCog />
                                            {selectedGroup.joinRequests?.length > 0 && <span className="badge badge-xs badge-error indicator-item"></span>}
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Admin Panel Overlay */}
                        {showAdminPanel && (
                            <div className="bg-base-200 p-4 border-b border-base-300 animate-in slide-in-from-top-2">
                                <h4 className="font-bold text-sm mb-2">Pending Join Requests</h4>
                                {selectedGroup.joinRequests?.length === 0 && <p className="text-xs opacity-50">No pending requests.</p>}
                                <div className="space-y-2">
                                    {selectedGroup.joinRequests?.map(reqEmail => (
                                        <div key={reqEmail} className="flex items-center justify-between bg-base-100 p-2 rounded">
                                            <span className="text-sm">{reqEmail}</span>
                                            <button className="btn btn-xs btn-success" onClick={() => handleApproveJoin(selectedGroup._id, reqEmail)}>Approve</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/50">
                            {messages.map((msg, idx) => {
                                const isMe = msg.author === user.email;
                                const isSystem = msg.author === 'system';
                                const isRead = msg.readBy?.length > 0;

                                if (isSystem && msg.type === 'schedule') {
                                    return (
                                        <div key={idx} className="flex justify-center my-4">
                                            <div className="card w-80 bg-base-100 shadow-xl border border-primary/20">
                                                <div className="card-body p-4 text-center">
                                                    <h2 className="card-title justify-center text-sm">📅 Study Session</h2>
                                                    <p className="font-bold text-lg">{msg.session?.topic}</p>
                                                    <p className="text-xs opacity-70">
                                                        {new Date(msg.session?.startTime).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs mt-1">Host: {msg.session?.creatorName}</p>
                                                    <div className="card-actions justify-center mt-2">
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => handleRSVP(msg.session?._id)}
                                                        >
                                                            Toggle RSVP
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={idx} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
                                        <div className="chat-header text-xs opacity-50 mb-1">
                                            {isMe ? 'You' : msg.author.split('@')[0]}
                                            <time className="ml-2">{msg.time}</time>
                                        </div>
                                        <div className={`chat-bubble ${isMe ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                            {msg.attachment?.url && (
                                                <div className="mb-2">
                                                    {msg.attachment.type === 'image' || msg.attachment.url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                                                        <img
                                                            src={msg.attachment.url}
                                                            alt="attachment"
                                                            className="max-w-[200px] rounded-lg border border-base-300 cursor-zoom-in hover:brightness-90 transition-all"
                                                            onClick={() => setPreviewImage(msg.attachment.url)}
                                                        />
                                                    ) : (
                                                        <a href={msg.attachment.url} target="_blank" rel="noopener noreferrer" className="underline text-xs flex items-center gap-1">
                                                            📎 Download File
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                            {msg.message}
                                        </div>
                                        {isMe && (
                                            <div className="chat-footer opacity-50 text-[10px] mt-1 flex items-center gap-1">
                                                {isRead ? <FaCheckDouble className="text-blue-500" /> : <FaCheck />}
                                                {isRead ? 'Read' : 'Sent'}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>



                        {/* Input Area */}
                        <div className="p-4 bg-base-100 border-t border-base-300">
                            {/* Preview Attachment */}
                            {tempAttachment && (
                                <div className="flex items-center gap-2 mb-2 p-2 bg-base-200 rounded text-xs">
                                    <span>📎 File Ready</span>
                                    <button onClick={() => setTempAttachment(null)} className="text-red-500 font-bold ml-auto">X</button>
                                </div>
                            )}

                            <div className="flex gap-2 max-w-4xl mx-auto items-center">
                                {/* File Upload Button */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                />
                                <button
                                    className={`btn btn-circle btn-ghost btn-sm ${isUploading ? 'loading' : ''}`}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    <FaPaperclip />
                                </button>

                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="input input-bordered flex-1"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button className="btn btn-primary px-6" onClick={sendMessage} disabled={isUploading}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-50">
                        <FaUsers className="text-6xl mb-4" />
                        <h3 className="text-2xl font-bold">Select a chat</h3>
                        <p className="mt-2 text-center max-w-sm">
                            Connect with partners via DMs or Groups.
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <dialog id="create_group_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Group</h3>
                    <div className="py-4 space-y-4">
                        <div className="form-control">
                            <label className="label">Group Name</label>
                            <input type="text" className="input input-bordered w-full" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label">Description</label>
                            <input type="text" className="input input-bordered w-full" value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog"><button className="btn btn-ghost mr-2">Cancel</button></form>
                        <button className="btn btn-primary" onClick={handleCreateGroup}>Create</button>
                    </div>
                </div>
            </dialog>

            {/* Schedule Session Modal */}
            <dialog id="schedule_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Schedule Study Session</h3>
                    <div className="py-4 space-y-4">
                        <div className="form-control">
                            <label className="label">Topic</label>
                            <input type="text" placeholder="e.g., Algebra Finals Prep" className="input input-bordered w-full" value={scheduleTopic} onChange={(e) => setScheduleTopic(e.target.value)} />
                        </div>
                        <div className="flex gap-4">
                            <div className="form-control flex-1">
                                <label className="label">Date</label>
                                <input type="date" className="input input-bordered w-full" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">Time</label>
                                <input type="time" className="input input-bordered w-full" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog"><button className="btn btn-ghost mr-2">Cancel</button></form>
                        <button className="btn btn-primary" onClick={handleCreateSession}>Schedule</button>
                    </div>
                </div>
            </dialog>

            <dialog id="start_dm_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Start Direct Message</h3>
                    <div className="py-4">
                        <div className="form-control">
                            <label className="label">Partner Email</label>
                            <input type="email" placeholder="user@example.com" className="input input-bordered w-full" value={dmReceiverEmail} onChange={(e) => setDmReceiverEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog"><button className="btn btn-ghost mr-2">Cancel</button></form>
                        <button className="btn btn-primary" onClick={handleStartDM}>Start Chat</button>
                    </div>
                </div>
            </dialog>

            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
                    onClick={() => setPreviewImage(null)}
                >
                    <img
                        src={previewImage}
                        alt="Full size"
                        className="max-w-[95%] max-h-[95vh] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-50 duration-200"
                    />
                    <button className="absolute top-4 right-4 text-white hover:text-red-500 font-bold text-xl p-2 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center">
                        ✕
                    </button>
                </div>
            )}

            {/* Incoming Call Modal */}
            {incomingCall && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="bg-base-100 p-8 rounded-lg shadow-2xl text-center animate-bounce-in">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://ui-avatars.com/api/?name=Caller" alt="caller" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Incoming {incomingCall.callType || 'Video'} Call...</h3>
                        <p className="mb-6 opacity-70">{incomingCall.fromEmail}</p>
                        <div className="flex gap-4 justify-center">
                            <button className="btn btn-error btn-circle btn-lg" onClick={rejectCall}>
                                <FaPhoneSlash />
                            </button>
                            <button className="btn btn-success btn-circle btn-lg animate-pulse" onClick={acceptCall}>
                                {incomingCall.callType === 'audio' ? <FaPhoneAlt /> : <FaVideo />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Video/Audio Call Modal */}
            {callActive && (
                <div className="fixed inset-0 z-50 bg-black flex flex-col">
                    <div className="relative flex-1 flex items-center justify-center overflow-hidden">

                        {/* Audio Only UI */}
                        {callType === 'audio' && (
                            <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                                <div className="avatar placeholder mb-8 animate-pulse">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-32 shadow-2xl border-4 border-primary">
                                        <span className="text-3xl"><FaUser /></span>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Audio Call</h2>
                                <p className="text-xl font-mono opacity-80">{formatTime(callDuration)}</p>
                                {/* Hidden Videos for Audio Processing */}
                                <video ref={remoteVideoRef} autoPlay className="hidden" />
                                <video ref={localVideoRef} autoPlay muted className="hidden" />
                            </div>
                        )}

                        {/* Video UI */}
                        {callType === 'video' && (
                            <>
                                {/* Remote Video (Full Screen) */}
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    className="absolute w-full h-full object-cover"
                                />

                                {/* Call Info / Timer */}
                                <div className="absolute top-4 left-4 z-10 bg-black/50 px-4 py-2 rounded-full text-white font-mono flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    {formatTime(callDuration)}
                                </div>

                                {/* Local Video (PiP) */}
                                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-xl">
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        muted
                                        className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
                                    />
                                    {isVideoOff && (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                                            <FaVideoSlash />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Overlay Controls */}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 items-center z-20">

                            <button className={`btn btn-circle btn-lg ${isMuted ? 'btn-warning' : 'btn-ghost bg-white/20 hover:bg-white/30 text-white'}`} onClick={toggleMute}>
                                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                            </button>

                            <button className="btn btn-error btn-circle btn-xl shadow-lg border-4 border-white" onClick={endCall}>
                                <FaPhoneSlash className="text-xl" />
                            </button>

                            {/* Only show video toggle if it's a video call */}
                            {callType === 'video' && (
                                <button className={`btn btn-circle btn-lg ${isVideoOff ? 'btn-warning' : 'btn-ghost bg-white/20 hover:bg-white/30 text-white'}`} onClick={toggleVideo}>
                                    {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Chat;
