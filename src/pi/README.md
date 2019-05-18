# 新手上路

## 安装
### 1、烧录系统
- 下载系统 [Raspbian](https://www.raspberrypi.org/downloads/)
- 用[win32diskimager](https://sourceforge.net/projects/win32diskimager/)烧录到sd卡  
- 插入树莓派->启动

### 2、设置
- 开启ssh
- 连接wifi

## 更换国内镜像源
### 文件1
```sh
sudo nano /etc/apt/sources.list
```
替换内容为：
```vim
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ stretch main contrib non-free rpi
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ stretch main contrib non-free rpi
```
### 文件2
新版树莓派可能没有这个目录，新建一个
```sh
sudo nano /etc/apt/sources.list.d/raspi.list
```
替换内容为：
```vim
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ stretch main ui
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ stretch main ui
```

## 安装miniconda或者berryconda

### 下载安装
- [miniconda](https://docs.conda.io/en/latest/miniconda.html)
- [berryconda](https://www.jianshu.com/p/ccad38dbb897)


### conda更换源
为了日常使用安装新的包、更新conda更快，我们也像使用 Anaconda 一样换源，具体操作如下：
```sh
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```

## piwheels
::: tip 注意
[piwheels](https://www.piwheels.org/packages.html)
很多python库无法直接安装pypi上的版本，需要从piwheels上下载whl文件直接安装
:::

## 安装难题
### [安装pygame失败：](https://raspberrypi.stackexchange.com/questions/66418/unable-to-run-sdl-config)
::: tip 错误信息
Unable to run “sdl-config”
:::
#### 解决方案：
```sh
sudo apt install apt-file
apt update
apt-file search "sdl-config"
sudo apt install libsdl1.2-dev
```

### [安装opencv失败：](https://stackoverflow.com/questions/53347759/importerror-libcblas-so-3-cannot-open-shared-object-file-no-such-file-or-dire)
::: tip 错误信息
> importError: libcblas.so.3: cannot open shared object file: No such file or directory 
:::
#### 解决方案：
```sh
pip3 install opencv-python 
sudo apt-get install libcblas-dev
sudo apt-get install libhdf5-dev
sudo apt-get install libhdf5-serial-dev
sudo apt-get install libatlas-base-dev
sudo apt-get install libjasper-dev 
sudo apt-get install libqtgui4 
sudo apt-get install libqt4-test
```

