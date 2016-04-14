#!/bin/bash

ulimit -n 10000

export PATH=~/.gradle/nodejs/node-v0.10.33-darwin-x64/bin:$PATH
export PATH=~/.gem/ruby/1.8/bin:$PATH

./node_modules/.bin/gulp $1
