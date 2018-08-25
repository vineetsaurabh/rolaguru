import { Component, AfterViewInit } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {

    chatActive: boolean = false;

    usernamePage: any;
    chatPage: any;
    messageInput: any;
    messageArea: any;
    connectingElement: any;

    stompClient = null;
    username = null;

    colors = [
        '#2196F3', '#32c787', '#00BCD4', '#ff5652',
        '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
    ];

    ngAfterViewInit() {
        this.usernamePage = document.getElementById('username-page');
        this.chatPage = document.getElementById('chat-page');
        this.messageInput = document.getElementById('message');
        this.messageArea = document.getElementById('messageArea');
        this.connectingElement = document.querySelector('.connecting');

        const usernameForm = document.getElementById('usernameForm');
        usernameForm.addEventListener('submit', this.connect, true);

        //const messageForm = document.getElementById('messageForm');
        //messageForm.addEventListener('submit', this.sendMessage, true);

    }

    connect(event) {
        const inputElement: any = document.getElementById('name');
        this.username = inputElement.value.trim()

        if (this.username) {
            this.chatActive = true;

            var socket = new SockJS(environment.baseUrl + "/ws");
            //this.stompClient = Stomp.over(socket);

            //this.stompClient.connect({}, this.onConnected, this.onError);
        }
        event.preventDefault();
    }


    onConnected() {
        // Subscribe to the Public Topic
        this.stompClient.subscribe(environment.baseUrl + '/topic/public', this.onMessageReceived);

        // Tell your username to the server
        this.stompClient.send(environment.baseUrl + "/chat.addUser",
            {},
            JSON.stringify({ sender: this.username, type: 'JOIN' })
        )

        this.connectingElement.classList.add('hidden');
    }


    onError(error) {
        this.connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
        //this.connectingElement.style.color = 'red';
    }


    sendMessage(event) {
        var messageContent = this.messageInput.textContent.trim();
        if (messageContent && this.stompClient) {
            var chatMessage = {
                sender: this.username,
                content: this.messageInput.textContent,
                type: 'CHAT'
            };
            this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            this.messageInput.textContent = '';
        }
        event.preventDefault();
    }


    onMessageReceived(payload) {
        var message = JSON.parse(payload.body);

        var messageElement = document.createElement('li');

        if (message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' joined!';
        } else if (message.type === 'LEAVE') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' left!';
        } else {
            messageElement.classList.add('chat-message');

            var avatarElement = document.createElement('i');
            var avatarText = document.createTextNode(message.sender[0]);
            avatarElement.appendChild(avatarText);
            avatarElement.style['background-color'] = this.getAvatarColor(message.sender);

            messageElement.appendChild(avatarElement);

            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode(message.sender);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
        }

        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);
        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);

        this.messageArea.appendChild(messageElement);
        this.messageArea.scrollTop = this.messageArea.scrollHeight;
    }


    getAvatarColor(messageSender) {
        var hash = 0;
        for (var i = 0; i < messageSender.length; i++) {
            hash = 31 * hash + messageSender.charCodeAt(i);
        }
        var index = Math.abs(hash % this.colors.length);
        return this.colors[index];
    }

}