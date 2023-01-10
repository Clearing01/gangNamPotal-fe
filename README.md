# README

--------------------------------------------------------------------------------
    # Language: markdown
    # README.md
--------------------------------------------------------------------------------




## Vue 3 + TypeScript + Vite + Pinia + Quasar


## Description

이 프로젝트는 Vue3 기반의 BaseCode제공을 위한 프로젝트입니다. TypeScript를 제공하며 CLI 도구는 Vite를 사용합니다. 전역 상태관리는 Pinia를 사용하며 Css Framework로 Quasar를 사용합니다.
각각의 라이브러리들은 모듈형태로 제공하며 필요에 따라 제거하시면됩니다.

* [vue3](https://vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs-kr.github.io/)
* [Pinia](https://pinia.vuejs.org/)
* [Quasar](https://quasar.dev/)

## Installation

Yarn 설치

```  
npm install -g yarn  
```  

yarn install 실행

```  
yarn install  
```  

Husky 설치

```  
yarn run prepare  
```  

Eslint 및 Prettier Editor 설정

- [VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [WebStorm](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_activate)

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [WebStorm](https://www.jetbrains.com/webstorm/)

### Recommended Node Version

- [Node.js](https://nodejs.org/en/) + 16.16.0 LTS

## Usage

### 실행

```  
yarn run serve  
```  

### 빌드 및 확인

Vue Build 실행

```  
yarn run build-{Mode}  
```  

Vue Preview 실행 (dist에 빌드된 정작 파일 실행)

```  
yarn run preview  
```  

### 프로젝트 구조

> 프로젝트 구조

```  
├── .husky   
│   ├── _  
│   │   ├── husky.sh (Husky 설정 파일)  
│   ├── pre-commit.sh // 커밋 전 실행되는 파일 lint-staged 사용  
├── public // 웹서비스용 폴더  
├── dist //빌드 결과물 (git에는 없음)  
├── src // 소스코드  
│   ├── assets // 이미지, 오디오, 비디오 등의 파일을 저장하는 폴더  
│   │   ├── font // 폰트 파일을 저장하는 폴더  
│   │   └── images // 이미지 파일을 저장하는 폴더  
│   ├── bridge // 브릿지 파일을 저장하는 폴더  
│   │   ├── navive // 앱용 브릿지 파일을 저장하는 폴더  
│   │   └── web // 웹용 브릿지 파일을 저장하는 폴더 더미 테스트 동작  
│   ├── components // 컴포넌트를 저장하는 폴더  
│   │   └── BaseDrawer.ts // 컴포넌트를 저장하는 파일 (샘플 컴포넌트)  
│   │   └── BaseHeader.ts // 컴포넌트를 저장하는 파일 (샘플 컴포넌트)   
│   ├── componsable // 재사용 컴포저블을 저장하는 폴더  
│   │   └── index.ts // 재사용 컴포저블 index 파일  
│   │   └── event.ts // 샘플 컴포저블  
│   ├── layouts // 레이아웃을 저장하는 폴더  
│   │   ├── CommonLayout.vue // 레이아웃을 저장하는 파일 (샘플 레이아웃)  
│   │   └── MainLayout.vue // 레이아웃을 저장하는 파일 (샘플 레이아웃)  
│   ├── modules // 모듈을 저장하는 폴더  
│   │   ├── axios.ts // axios Instance 생성 및 interceptor 처리 및 설정  
│   │   ├── pinia.ts // Store 생성 및 설정  
│   │   ├── quasar.ts // Quasar 생성 및 설정  
│   │   └── router.ts // rotuer 생성  
│   ├── pages // 페이지를 저장하는 폴더 하위 구조는 해당 프로젝트의 메뉴트리를 따름 (예: /pages/pay/Index.vue)   
│   │   ├── common // 공통 페이지를 저장하는 폴더 │   │   │   └── 404.vue // 404 페이지 (샘플 페이지)   
│   ├── router // 라우터를 저장하는 폴더 │   │   ├── index.ts // 라우터를 생성 및 설정 │   │   └── routes.ts // 라우팅 하기 위한 경로 설정 메뉴트리 별로 파일을 생성해서 routes.ts 파일에 추가해야 함  
│   ├── service // 서비스를 저장하는 폴더  
│   │   └── authService.ts // 인증 서비스 생성 및 설정 (샘플 서비스)  
│   ├── store // 스토어를 저장하는 폴더  
│   │   ├── auth.ts // 인증 스토어 생성 및 설정 (샘플 스토어)  
│   │   └── ui.ts // UI 스토어 생성 및 설정 (샘플 스토어)  
│   ├── styles // 스타일을 저장하는 폴더 │   │   ├── quasar-variables.sass // Quasar 변수 스타일 설정  
│   │   └── reset.scss // 초기화 스타일 설정  
│   ├── App.vue // 앱 파일  
│   ├── main.ts // 앱 실행 및 설정 (modules 등록)  
│   ├── vite-env.d.ts // vue typescript 설정  
├── .env // 환경변수 설정 (공통) 하위 .env.*를 사용하면 .env 설정을 덮어쓰게됨 ├── .env.dev // 환경변수 설정 (디버깅)  
├── .env.local // 환경변수 설정 (로컬) git에 올리지 않고 본인만 사용하는 용도  
├── .env.stg // 환경변수 설정 (스테이지)  
├── .env.prod // 환경변수 설정 (상용)  
├── .eslintrc // eslint 설정 ├── .gitignore // git 저장소 제외 설정 ├── .prettierrc // prettier 설정 ├── index.html // 웹 사이트 인덱스 파일 ├── package.json // 앱 정보 설정 ├── tsconfig.json // typescript 설정 ├── vite.config.ts // vite 설정 
```

## Roadmap
제공하는 라이브러리 메이저 버젼에 대응합니다.

## Project status
해당 프로젝트는 중지된 상태입니다. 
