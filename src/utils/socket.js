import socket from "socket.io-client";
import { baseUrl } from "./urls";

export const io = socket(baseUrl);
