@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@REM Resolve any "." and ".." in APP_HOME to make it absolute
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@REM Find Java
if not "%JAVA_HOME%" == "" goto OkJvm
set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto RunApp
echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
goto end

:OkJvm
set JAVA_EXE=%JAVA_HOME%\bin\java.exe

:RunApp
set WRAPPER_JAR="%APP_HOME%\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%APP_HOME%\.mvn\wrapper\maven-wrapper.properties"

if exist %WRAPPER_JAR% goto RunJar

@REM Download jar using PowerShell
echo Downloading Maven Wrapper Jar...
if not exist "%APP_HOME%\.mvn\wrapper" mkdir "%APP_HOME%\.mvn\wrapper"
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', %WRAPPER_JAR%)"

:RunJar
if not exist %WRAPPER_JAR% (
  echo ERROR: Failed to download maven-wrapper.jar
  goto end
)

"%JAVA_EXE%" -jar %WRAPPER_JAR% %*
if "%ERRORLEVEL%" == "0" goto end
exit /b %ERRORLEVEL%

:end
endlocal
