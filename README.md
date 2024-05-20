# *dururu*
 ![desk_1](https://github.com/Jy0042/dururu/assets/104992286/2b4863b2-b01a-4746-a90f-767846ca46c4)

dururu는 **데스크테리어 상품 판매** 및 **커뮤니티 기능**을 포함한 **온라인 쇼핑 플랫폼** 입니다.
 <br>
 <br>
 <br>

## 🔗 배포 주소
https://duruduru.netlify.app/
<br>
<br>

## 📚 기술 스택
**• Frontend** 
 <br>

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178c6?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
</div>
  <br>

**• Design**
 <br>

<div>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/adobephotoshop-31A8FF?style=for-the-badge&logo=bootstrap&logoColor=white">
</div>
  <br>
  
**• Development Tool**
<br>

<div>
 <img src="https://img.shields.io/badge/Visualstudiocode-5C2D91?style=for-the-badge&logo=bootstrap&logoColor=white">
</div>
<br>

**• Version Control**
<br>

<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>
<br>

**• Scrum**
<br>

<div>
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/kakaotalk-FFCD00?style=for-the-badge&logo=bootstrap&logoColor=white">
  <br>
</div>
<br>

**( + Gather )**
<div>
  <img width="334" alt="gather" src="https://github.com/Jy0042/dururu/assets/104992286/a45f6906-5cd5-47e0-acf4-fd61fb2b87a0">
</div>
<br>

## 👩🏻‍💻 Contributor
|                     노지애                     |                 신준영                 |                 이다영                 |                조은별                |                진가영                |                홍정민                |
| :--------------------------------------------: | :------------------------------------: | :------------------------------------: | :----------------------------------: | :----------------------------------: | :----------------------------------: |
| [@jiaero](https://github.com/jiaero) | [@jy0042](https://github.com/Jy0042) | [@leeraquel](https://github.com/leeraquel) | [@eun1230](https://github.com/eun1230) | [@JIN-415](https://github.com/JIN-415) | [@meenie49](https://github.com/meenie49) |
<br>

### 📁 폴더 구조

```sh
📦dururu
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📂img
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂category
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂mypage order
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┣ 📂productDetail
 ┃ ┃ ┗ 📂search
 ┃ ┣ 📂hooks
 ┃ ┣ 📂pages
 ┃ ┣ 📂redux
 ┃ ┣ 📂styles
 ┃ ┣ 📂types
 ┃ ┣ 📂utils
 ┃ ┣ 📂App.css
 ┃ ┣ 📂App.tsx
 ┃ ┗ 📂index.tsx
 ┣ 📂.eslintrc.json
 ┣ 📜.prettierrc
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```


## 🕹️ Page Features

#### | Main page |

* 헤더와 카테고리 네이게이션바를 통해 모든 페이지에 접근 가능

#### | 통합검색 |

* 상품 데이터를 순회하여 검색어가 포함된 카테고리 대분류 및 소분류, 브랜드, 제품명이 있는 경우 데이터 표시
* 커뮤니티 피드 데이터를 순회하여 검색어와 일치하는 태그 제품이 있는 경우 데이터 표시

#### | 로그인 |

* 로그인 시 목데이터에 저장된 유저 정보와 입력한 정보가 같은지 확인
* 로그인이 완료되면 로그인 상태가 세션 스토리지에 저장됨

#### | 회원가입 |

* 기존에 저장되어 있는 유저 정보와 중복되면 회원가입 불가능
* 이메일 형식이 맞는지 확인
* 하나 이상의 영문, 숫자, 특수문자를 조합한 8자 ~ 20자의 비밀번호만 입력가능
* 비밀번호 중복 확인
* 전화번호는 01로 시작하는 9 ~ 11개의 번호만 입력가능
* 인증번호가 저장되어있는 정보와 일치하면 인증 & 회원가입 성공

#### | 쇼핑 - 카테고리 |

* 카테고리 대분류, 소분류로 선택한 값에 맞는 상품들을 렌더링
* 선택사항: 브랜드, 색상, 가격대, 테마를 기준으로 상품필터링
* 인기순, 리뷰많은순, 낮은가격순, 높은가격순, 할인율 높은순으로 정렬

#### | 쇼핑 - 베스트 및 세일 |

* 베스트상품은 상위 50개만 조회순으로 렌더링
* 세일 상품은 할인율이 높은순으로 할인을 강조하여 렌더링

#### | 상품상세 및 주문 |

* 옵션과 수량 선택 후 장바구니에 담거나 주문페이지로 이동
* 상품에 대한 상세 정보와 리뷰, 문의가 있고 커뮤니티와 연결된 스타일링샷 존재
* 사용자에게 베송 정보와 쿠폰, 마일리지 사용 여부를 확인. 결제 완료 후 주문 내역 페이지에서 확인 가능

#### | 커뮤니티 - 메인 |

* 기본적으로 mock 데이터를 보여주며, 필터기능을 통해 사용자가 선택한 옵션에 맞는 정보를 제공

#### | 커뮤니티 - 디테일 |

* 사용했던 제품 태그를 통하여 해당 제품 페이지에 접근 할 수 있도록 설계

#### | 피드 포스팅 / 수정 |

* 사용자가 직접 피드를 작성할 수 있도록 form 제공
* react-hook-form을 이용한 form 코드 최적화
* rudux-thunk를 이용하여 제출된 폼을 store에 저장하고 내용이 결과 페이지에 보여질 수 있도록 비동기 처리
  
#### | 마이페이지 |

* 세션스토리지로 최근 본 상품을 저장하여 렌더링
* 모든 페이지에서 찜한 상태가 반영되며 찜한 상품만 조회 가능
* 사용자가 작성한 피드, 댓글, 좋아요한 피드들을 제공하여 사용자의 활동 기록을 한 눈에 볼 수 있도록 구현
<br>


## ⚙️ Before Started

프로젝트를 개발하기 위해 다음 단계를 따라주세요 ☺︎

### 1. 이 프로젝트를 클론 합니다.

```sh
git clone https://github.com/Jy0042/dururu.git
```

### 2. 프로젝트 디렉토리로 이동합니다.

```sh
cd dururu
```

### 3. VSCode를 실행합니다.

```sh
code .
```

### 4. npm 설치 후 실행합니다.

```sh
npm install
```

```sh
npm start
```


<br>

## 🏷️ License

해당 사이트 제작에 사용한 모든 이미지의 저작권은 소유자에게 있으며, 학습용으로 사용했음을 알립니다.

