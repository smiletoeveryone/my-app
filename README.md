# 🦁 Metalion Redemption UI

This repo is built with NextJS + ChakraUI / Deployed on Vercel

## Getting Started

Create a `.env.local` and copy the necessary `ENV` variables inside `.env.sample`.

To run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

We have configured two urls for `prod` and `staging`

- `prod`: https://metalion.mtrs.io uses `polygon` mainnet - `matic`
- `staging` https://test-metalion.mtrs.io uses `polygon` testnet - `mumbai`

## Flow Diagram

![image](https://user-images.githubusercontent.com/4248780/167772031-60e52322-ac68-465d-a26c-9aea3373c2e4.png)

Currently wrapping REDREAMER APIs: [https://docs.redreamer.io/re-dreamer-labs-product/auth](https://docs.redreamer.io/re-dreamer-labs-product/auth)

All authenticated APIs requires token set  as bearer token on `Authorization` header.

### GET /v1/redeem/nonce

---

This API is to get the nonce to sign with MetaMask, then send it to Login API to complete authentication.

#### Response

```json
{
  "nonce": "bf855163-7182-47a7-a1bf-f3beb12f68d9"
}
```

### POST /v1/redeem/login

---

This API takes the nonce from previous API and complete the login on REDREAMER side. It will get the necessary tokens and set as Secure Cookie in the response. 

🚨 Browser should save the secure cookies, and will use for subsequent requests

#### Request

```json
{
	"network": "polygon",
	"address": "0x68ef21de728d15af762ce33067290dd7368f71d7",
	"signature": "0xa9940ea1208abc0f9450abff4579507122c2f26dae2e83c62a746ac27de2e043181f54469a08d7ee16bb501094795a22d9c44bdd39421dc963a5a1d40cfc48cc1c"
}
```

#### Response

```json
{
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2OGVmMjFkZTcyOGQxNWFmNzYyY2UzMzA2NzI5MGRkNzM2OGY3MWQ3IiwiZXhwIjoxNjUxODEzMjEyLCJpYXQiOjE2NTE3MjY4MTIsImlzcyI6InJlZHJlYW1lciIsInNjb3BlcyI6IiJ9.x-6A7eSC7VjexKMECIN86q0QwS9lLz8bh8-B4zxstbOXamnWBvs41wT4ojerv1O5-JFQcAX0On7Qv5s3gwNuwA",
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2OGVmMjFkZTcyOGQxNWFmNzYyY2UzMzA2NzI5MGRkNzM2OGY3MWQ3IiwiZXhwIjoxNjUxNzMwNDEyLCJpYXQiOjE2NTE3MjY4MTIsImlzcyI6InJlZHJlYW1lciIsInNjb3BlcyI6IiJ9.JL6JoL5YHvuXzYcou_6Y7dDXE4d-jfogXsBQP4XmkE_VBJ578GDyEgfsHIvjaIXKLvb7xbdMEIr6TCvE7Rcxsg"
}
```

### POST /v1/redeem/refresh

---

Use Refresh Token to exchange for new pair of Refresh Token and Token

#### Request

```json
{
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2OGVmMjFkZTcyOGQxNWFmNzYyY2UzMzA2NzI5MGRkNzM2OGY3MWQ3IiwiZXhwIjoxNjUxODEzMjEyLCJpYXQiOjE2NTE3MjY4MTIsImlzcyI6InJlZHJlYW1lciIsInNjb3BlcyI6IiJ9.x-6A7eSC7VjexKMECIN86q0QwS9lLz8bh8-B4zxstbOXamnWBvs41wT4ojerv1O5-JFQcAX0On7Qv5s3gwNuwA",
  "address": ""
}
```

#### Response

```json
{
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2OGVmMjFkZTcyOGQxNWFmNzYyY2UzMzA2NzI5MGRkNzM2OGY3MWQ3IiwiZXhwIjoxNjUxODEzMjEyLCJpYXQiOjE2NTE3MjY4MTIsImlzcyI6InJlZHJlYW1lciIsInNjb3BlcyI6IiJ9.x-6A7eSC7VjexKMECIN86q0QwS9lLz8bh8-B4zxstbOXamnWBvs41wT4ojerv1O5-JFQcAX0On7Qv5s3gwNuwA",
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2OGVmMjFkZTcyOGQxNWFmNzYyY2UzMzA2NzI5MGRkNzM2OGY3MWQ3IiwiZXhwIjoxNjUxNzMwNDEyLCJpYXQiOjE2NTE3MjY4MTIsImlzcyI6InJlZHJlYW1lciIsInNjb3BlcyI6IiJ9.JL6JoL5YHvuXzYcou_6Y7dDXE4d-jfogXsBQP4XmkE_VBJ578GDyEgfsHIvjaIXKLvb7xbdMEIr6TCvE7Rcxsg"
}
```

### GET /v1/redeem/tokens

---

This API is the core that utilizes REDREAMER’s campaign and NFT APIs, consolidate the results into single API that builds the relationship between the two. This helps skipping an API call in the frontend and enables multi-select campaign for a particular NFT. 

#### Response

```json
{
  "campaign_id": "16672c3c-e3cb-4db4-8406-f0d3c0073c03",
  "tokens": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "network": "polygon",
      "contract_address": "0xe3f08b6fe26d0057e310185481bb30b02c5aee25",
      "token_id": 1,
      "name": "Metalion getting coffee",
      "description": "宙獅計劃的起源，加入我們一起探索宙獅宇宙吧",
      "image": "https://metalion.s3.ap-northeast-1.amazonaws.com/nft-image.png"
    },
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "network": "polygon",
      "contract_address": "0xe3f08b6fe26d0057e310185481bb30b02c5aee25",
      "token_id": 19,
      "name": "Metalion getting coffee",
      "description": "宙獅計劃的起源，加入我們一起探索宙獅宇宙吧",
      "image": "https://metalion.s3.ap-northeast-1.amazonaws.com/nft-image.png"
    },
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "network": "polygon",
      "contract_address": "0xe3f08b6fe26d0057e310185481bb30b02c5aee25",
      "token_id": 17,
      "name": "Metalion getting coffee",
      "description": "宙獅計劃的起源，加入我們一起探索宙獅宇宙吧",
      "image": "https://metalion.s3.ap-northeast-1.amazonaws.com/nft-image.png"
    },
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "network": "polygon",
      "contract_address": "0xe3f08b6fe26d0057e310185481bb30b02c5aee25",
      "token_id": 18,
      "name": "Metalion getting coffee",
      "description": "宙獅計劃的起源，加入我們一起探索宙獅宇宙吧",
      "image": "https://metalion.s3.ap-northeast-1.amazonaws.com/nft-image.png"
    }
  ],
  "redeem_otpions": [
    {
      "option_id": "AMERICANO",
      "option_display": "Americano"
    },
    {
      "option_id": "LATTE",
      "option_display": "Latte"
    }
  ]
}
```

### POST /v1/redeem

---

#### Request

```json
{
	"campaign_id": "UUID",
	"contract_address": "0xe3f08b6fe26d0057e310185481bb30b02c5aee25",
	"token_id": 20,
	"signature": "0xfc83c6909c52da77faad349e9593595500bfcac09ff6dbc37c5f8977cd0968a11ce2054e82ffa799daac53a3070b3be7abd441b1e36c09c35446aa3146d0279c1c",
	"redeem_option_id": "LATTE"
}
```

#### Response

```json
{
  "after_requested": 0,
  "created_at": "2022-05-07T18:22:34.308321462Z",
  "qr_code": "REDREAMER:eyJuZXR3b3JrIjoicG9seWdvbiIsImNhbXBhaWduX2lkIjoiMTY2NzJjM2MtZTNjYi00ZGI0LTg0MDYtZjBkM2MwMDczYzAzIiwiY29udHJhY3RfYWRkcmVzcyI6IjB4ZTNmMDhiNmZlMjZkMDA1N2UzMTAxODU0ODFiYjMwYjAyYzVhZWUyNSIsInRva2VuX2lkIjoxNywicmVxdWVzdGVyX2FkZHJlc3MiOiIweDY4ZWYyMWRlNzI4ZDE1YWY3NjJjZTMzMDY3MjkwZGQ3MzY4ZjcxZDciLCJoYXNoIjoiOWIxZDM2N2QtODJjZS00ZGU5LWFiZmMtNTk2OWRiZjA1MTFlIn0=",
  "redeemed_description": "redeemed!",
  "requested_description": "requested!"
}
```

Status Code

- 400 - `EXCEED_MAXIMUM_PASSPORT_REDEMPTION` when NFT is redeemed already
