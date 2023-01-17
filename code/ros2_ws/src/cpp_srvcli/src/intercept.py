import frida
import os
import sys
import time
import argparse

def on_message(message, data):
	print("******** INTERCEPTED ********")
	print("Message:")
	print(message)
	print("Data:")
	print(data)
	print("*****************************")

##TAKE_SERVICE_REQUEST(Type) rlpcy ros2 lib, 

parser = argparse.ArgumentParser(description='intercept.py')
parser.add_argument("-f", "--file", help="target", required=True)
args = parser.parse_args()
pid = frida.spawn(args.file)

session = frida.attach(pid)
time.sleep(1)
script = session.create_script(open("frida-script.js").read())
script.on('message', on_message)
script.load()
frida.resume(pid)
os.wait()
