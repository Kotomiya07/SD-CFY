..\python_embeded\python.exe .\update.py ..\SD-CFY\
..\python_embeded\python.exe -s -m pip install --upgrade torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu117 xformers -r ../SD-CFY/requirements.txt pygit2
pause
