# toDo List

## 설명

이 프로젝트는 **할 일 목록 관리 앱**으로, 사용자들이 할 일을 등록하고, 조회하고, 수정하고, 삭제할 수 있는 기능을 제공합니다.

## 기능

- 할 일 목록 조회/추가/수정/삭제
- 완료된 항목을 표시
- 반응형 디자인

## 사용 기술

- **프레임워크**: Next.js
- **언어**: TypeScript
- **UI 라이브러리**: TailwindCSS
- **API**: RESTful API (외부 API 연동)

## 설치 방법

1. 이 저장소를 클론합니다.

   ```bash
   git clone https://github.com/mxndxx/todoList.git

2. 의존성 설치
프로젝트 디렉토리로 이동한 후, 필요한 패키지를 설치합니다.

   ```bash
   cd 프로젝트명
   npm install

3. 로컬 서버 실행

   ```bash
   npm install
   
4. 웹 브라우저에서 http://localhost:3000에 접속하여 프로젝트를 확인할 수 있습니다.

## 사용 방법
1. 추가: 메인 화면 상단 인풋 박스에 할 일을 입력하고 추가하기 버튼 또는 엔터를 입력하면 할 일이 추가됩니다.
2. 조회: 메인 화면에서 할 일과 완료한 일을 조회할 수 있습니다.
3. 완료상태 수정: 메인 화면에서 조회된 할 일에 왼쪽 버튼을 누르면 완료상태를 수정할 수 있습니다.
4. 수정: 메인 화면에서 조회된 할 일을 클릭하면 상세 화면으로 이동합니다. 할 일의 이름, 메모, 이미지, 완료상태를 수정하고 수정완료 버튼을 누르면 수정할 수 있습니다.
5. 삭제: 상세 화면에서 삭제하기 버튼을 누르면 할 일이 삭제됩니다.

