
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { REACT_APP_IP_ADDRESS } from "../env";

const SOCKET_SERVER_URL = `http://${REACT_APP_IP_ADDRESS}:3001`;

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Kết nối đến server
        const socketInstance = io(SOCKET_SERVER_URL, {
            transports: ["websocket"],
        });

        setSocket(socketInstance);

        // Lắng nghe sự kiện kết nối
        socketInstance.on("connect", () => {
            console.log("Connected to Socket.IO server");
        });

        // Lắng nghe sự kiện ngắt kết nối
        socketInstance.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
        });

        // Dọn dẹp socket khi component unmount
        return () => {
            socketInstance.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    return socket;
};

export default useSocket;
