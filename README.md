# 리액트 최적화 하기
1. 이미지, 동영상, 폰트 등의 정적 리소스 최적화
2. 불필요한 렌더링 줄이기
3. UX 경험 올리기 (예상치 못한 에러 상황 대응)

<br />
<br />
<br />

[프로젝트 환경 세팅](#프로젝트-환경-구성)

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
   ```s
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
