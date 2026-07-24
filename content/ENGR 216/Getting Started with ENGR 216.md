---
title: Getting Started with ENGR 216
draft: fasle
tags: 
- engr216
- getting-started
---

In ENGR 216, you are learning about classic Newtonian physics in engineering lab. In this article, we will walk you through setting up your computer, connecting to Jetson, and some common commands you will need throughout the course.

To work comfortably the engineering labs, please take a look at [[Command Line Basics]]

## Setting up your computer and connecting to Jetson

You will be collecting data through the Jetson system. For your computer to communicate with Jetson, you will need to connect to it every time you open a new session. 

> [!todo] Preparing your computer for ENGR 216
> Depending on your device operating system (Windows or MacOS), you will connect to the Jetson Linux machine differently.
> 
> For Windows users:
> 1. Download MobaXterm **Installer Edition** from their [official website](https://mobaxterm.mobatek.net/download-home-edition.html).
> 2. Make sure that you have **unzipped** the file before you hit download.
> 3. In MobaXterm, start a new session.
> 
> For Mac users:
> You will not need MobaXterm. Instead, you will connect directly to Jetson via your terminal. To open your terminal, do ⌘ Command + Space, and search for Terminal.


> [!todo] Connecting to Jetson
> For both Windows and MacOS users, once you have a new terminal open:
> 4. Make sure that your WIFI connection is turned off. You will need WIFI turned off while working with Jetson.
> 5. Check that you have connected your machine and Jetson via the cable provided.
> 6. In a new terminal, copy and paste:
> ```bash
> ssh ubuntu@192.168.10.2
> ```
> 7. The password is: ubuntu. The password will not show up when you type it, so keep typing. Once you are done, hit enter.
> 
> After you have been connect, MobaXterm will ask you for a password and a username to save the password for future use, and Mac will ask you to authorize your connection. Continue as instructed. 

## Linux Commands Cheatseat

What you are looking at in terminal or MobaXterm is the Command Lind Interface (CLI) just like you have seen working with Python in ENGR 102. This time, you will learn to use the Linux commands to communicate with Jetson. Listed below are common commands that will show up time-to-time in ENGR 216 and 217 lab.

To quickly copy the command, you can use the copy button on the top right corner.

### Copying a file
``` bash
cp <file you want to copy> <where you want it to be>
```