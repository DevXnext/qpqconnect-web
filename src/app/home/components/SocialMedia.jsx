"use client";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  InstagramIcon,
  InstapaperShareButton,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

export default function SocialMedia() {
  return (
    <>
      <FacebookShareButton url={"https://www.facebook.com"}>
        <FacebookIcon size={32} round className="me-4" />
      </FacebookShareButton>
      <InstapaperShareButton url={"https://www.facebook.com"}>
        <InstagramIcon size={32} round className="me-4" />
      </InstapaperShareButton>
      <TwitterShareButton url={"https://github.com/next-share"}>
        <TwitterIcon size={32} round className="me-4" />
      </TwitterShareButton>
    </>
  );
}
