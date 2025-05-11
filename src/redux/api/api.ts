// services/chatApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { key, url } from "../../constants/api";

interface RequestPayload {
  contents: {
    parts: { text: string }[];
  }[];
}

interface ResponsePayload {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl:url
  }),
  endpoints: (builder) => ({
    generateContent: builder.mutation<ResponsePayload, RequestPayload>({
      query: (body) => ({
        url: `gemini-2.0-flash:generateContent?key=${key}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGenerateContentMutation } = chatApi;
