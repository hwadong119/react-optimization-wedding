# 리액트 최적화 하기
1. 이미지, 동영상, 폰트 등의 정적 리소스 최적화
2. 불필요한 렌더링 줄이기
3. UX 경험 올리기 (예상치 못한 에러 상황 대응)

<br />
<br />
<br />

[프로젝트 환경 세팅](#프로젝트-환경-구성) <br />
[Json-Server](#json-server) <br />
[Font](#font) <br />
[date-fns](#date-fns) <br />

<br />
<br />
<br />

# 프로젝트 환경 구성

- Boilerplate : Create React App + TypeScript
- Rules : ESLint + Prettier
- Style : SCSS
- Package Manager : Yarn Berry (with. pnp)

<br />

## Yarn Berry (PnP)

> Package Manager로 Yarn Berry(with. pnp)를 사용하는 이유

- 효율적인 의존성 검색
- 엄격한 의존성 관리
- CI 시간 단축

> 설정

- Yarn Berry 버전으로

  ```terminal
  yarn set version berry
  ```

- Node linker 설정

  ```yml
  .yarnrc.yml 파일

  nodeLinker: pnp   # node_modules를 안 쓰기 때문에 pnp를 명시적으로 적어둠
  ```

- yarn install 을 통해서 패키지 설치

  ```terminal
  yarn install
  ```

- Yarn Berry와 IDE 통합 - ZipFS Plugin 설치

  ```terminal
  yarn dlx @yarnpkg/sdks vscode
  ```

  명령어 입력 후 Allow 버튼 클릭 (typescript 설정 - 워크스페이스 버전에 맞는 타입스크립트 버전을 사용하도록 허용)

- gitignore 설정

      ```
      // yarn zero install
      .yarn/*
      !.yarn/cache
      !.yarn/patches
      !.yarn/plugins
      !.yarn/releases
      !.yarn/sdks
      !.yarn/versions
      ```

  <br />

## ESLint, Prettier 설정

- 설치

  ```terminal
  yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-config-react-app
  ```

- package.json에서 .eslintrc.json 파일 분리, eslint 설정

  ```json
  {
    "extends": ["react-app", "react-app/jest", "plugin:prettier/recommended"],
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  }
  ```

- .prettierrc 설정

  ```json
  {
    "useTabs": false,
    "printWidth": 80,
    "tabWidth": 2,
    "singleQuote": true,
    "trailingComma": "all",
    "endOfLine": "lf",
    "semi": false,
    "arrowParens": "always"
  }
  ```

- settings.json에 추가 ()

  파일을 저장할 때 자동으로 ESLint 규칙을 기반으로 코드 정리와 수정을 수행

  ```json
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
  ```

- 프로젝트에서 VSCode용 Yarn SDK를 임시로 다운로드하고 설정

  ```terminal
  yarn dlx @yarnpkg/sdks vscode
  ```

  명령어 입력 후 Allow 버튼 클릭 (typescript 설정 - 워크스페이스 버전에 맞는 타입스크립트 버전을 사용하도록 허용)

## Craco Alias 설정

경로 별칭(Path Aliases)을 설정하는 방법 중 하나

예를 들어, `src/components` 폴더에 있는 컴포넌트를 임포트할 때마다 `../../../components/MyComponent`와 같은 긴 상대 경로 대신 `@components/MyComponent`와 같이 별칭을 사용할 수 있다.

- **CRACO 설치**

  ```bash
  yarn add -D @craco/craco craco-alias
  ```

- **`tsconfig.paths.json` 파일 생성**

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"],
        "@components/*": ["src/components/*"]
      }
    }
  }
  ```

- **`craco.config.js` 파일 생성**

  ```js
  const CracoAlias = require('craco-alias')

  module.exports = {
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          source: 'tsconfig',
          tsConfigPath: 'tsconfig.paths.json',
        },
      },
    ],
  }
  ```

3. **스크립트 수정**:

   `tsconfig.json` 파일 수정
   ```json
   "extends": "./tsconfig.paths.json",
    
    ...

   "include": [
      "src",
      "tsconfig.paths.json"
    ]
   ```
   `package.json` 파일에서 `scripts` 부분을 CRACO를 사용하도록 수정
   ```json
   "scripts": {
     "start": "craco start",
     "build": "craco build",
     "test": "craco test"
   }
   ```

이러한 설정 후, `@components`와 같이 설정한 별칭을 사용하여 `src/components` 폴더 내의 파일을 간편하게 임포트할 수 있다.

## SCSS 설정

- SCSS : CSS의 기능을 확장시켜주는 도구, CSS의 모든 기능을 포함하고 있고, 변수, 믹스인, 상속과 같은 추가적인 기능들을 제공하여 코드의 재사용성을 높이고 유지보수를 용이하게 만들어준다.

- 설치
    ```terminal
    yarn add classnames sass
    ```

<br />
<br />
<br />

# Json-Server

[json server Github 페이지](https://github.com/typicode/json-server)

> 설치

```teminal
yarn add -D json-server
```
<br />

> db.json 파일 생성 (예시)
```json
{
  "posts": [    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```
<br />

> scripts에 단축키 생성
```json
/package.json

"scripts": {
  "start": "react-scripts start",
  
  ...

  "dev:db": "json-server --watch db.json --port=8888"
},
```

<br />
<br />
<br />

# Font 

`src\assets\fonts`  폴더를 생성하고, 다운로드 받은 폰트 파일을 해당 폴더에 저장

src 폴더에 폰트 파일을 넣는 이유 - src 폴더 내에 저장하면 번들링에 포함되며, 이를 통해 최적화 효과를 얻을 수 있다.

`src\scss\font.scss`
```scss
@font-face {
  font-family: "NanumMyeongjoYetHangul";
  src: 
    url("../assets/fonts/NanumMyeongjo-YetHangul.woff2") format("woff2"),
    url("../assets/fonts/NanumMyeongjo-YetHangul.woff") format("woff"),
    url("../assets/fonts/NanumMyeongjo-YetHangul.ttf") format("truetype");
}
```

`src\scss\global.scss`
```scss
@import url("./font.scss");

body {
  font-family: "NanumMyeongjoYetHangul";
}
```

<br />
<br />
<br />

# date-fns

`date-fns`는 JavaScript에서 날짜를 처리하기 위한 경량 라이브러리.

Moment.js와 같은 다른 날짜 처리 라이브러리에 비해 더 작은 번들 사이즈를 가지며, 함수형 프로그래밍 패러다임을 따른다. 

### 설치

```bash
yarn add date-fns
```

설치 후, 필요한 함수를 임포트하여 사용

```javascript
import { format, compareAsc } from 'date-fns';

// 오늘 날짜를 "yyyy-MM-dd" 포맷으로 출력
console.log(format(new Date(), 'yyyy-MM-dd'));

// 두 날짜를 비교
const dates = [
  new Date(1989, 6, 10),
  new Date(1987, 1, 11)
];
dates.sort(compareAsc);
console.log(dates);
```

### 예시: 날짜 차이 계산

```javascript
import { differenceInDays } from 'date-fns';

const start = new Date(2020, 8, 1); // 2020년 9월 1일
const end = new Date(2020, 8, 10); // 2020년 9월 10일

// 두 날짜의 차이를 일 단위로 계산
console.log(differenceInDays(end, start)); // 출력: 9
```

[date-fns 공식 문서](https://date-fns.org/)