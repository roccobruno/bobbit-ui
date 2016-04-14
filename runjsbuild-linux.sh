#!/bin/bash


export PATH=~/.gradle/nodejs/node-v0.10.33-linux-x64/bin:$PATH
export PATH=~/.gem/ruby/1.9.1/bin:$PATH

while true
do
	./node_modules/.bin/gulp $1
	if [ $? -ne 0 ]
	then
		notify-send "Test Loop Crashed out: Probably a compile failure!"
	fi
	break;
done

