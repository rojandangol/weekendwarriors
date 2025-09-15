# https://www.geeksforgeeks.org/python-subprocess-module/
#time.sleep & wait from OS
import subprocess
import time

#start backend
print("starting backend")

# get into the correct file n run the command
backend_process = subprocess.Popen(
    ["npm", "start"],
    cwd="./GolfTipsServer",
)

#give it time to start
time.sleep(3)

# start expo
print("starting frontend")

# get into the correct file n run the command
frontend_process = subprocess.Popen(
    ["npx", "expo", "start"],
    cwd="./GolfTips",
)


# wait for them to finish (so Python script doesn't exit immediately)
backend_process.wait()
frontend_process.wait()
