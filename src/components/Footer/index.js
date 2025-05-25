"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { YoutubeIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <footer className="bg-[#1a1a1a] h-[90vh] flex flex-col p-10 text-[#f4f1e7] mt-10 w-[100vw]">
      <div className="h-full  flex flex-row justify-between">
        <div className="flex flex-col items-end justify-center w-[60%] ">
          <div style={{ textAlign: "left" }}>
            <p className="text-sm text-[#9c9a94]">Get in Touch</p>
            <p className="mt-5 text-lg ">
              Want to support our mission? <br /> Contact us to learn how you can
              help international students.
            </p>
            <div className="flex flex-row gap-8 mt-8">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-8 h-7 bg-[#f4f1e7] rounded-sm flex items-center justify-center">
                  <Image
                    src="/images/message-icon.png"
                    alt="Email icon"
                    width={20}
                    height={20}
                  />
                </div>
                <p className="text-xs">Email</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-8 h-7 bg-[#f4f1e7] rounded-sm flex items-center justify-center">
                  <Image
                    src="/images/phone-icon.png"
                    alt="Phone icon"
                    width={20}
                    height={20}
                  />
                </div>
                <p className="text-xs">Contact us via email</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-[30%] flex justify-end items-start text-xs">
          <div className="flex flex-col border p-3 w-[14vw] border-[#f4f1e7] rounded-sm">
            <div>
              <p>Foundation Address</p>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <div>
                <div className="w-8 h-7 bg-[#f4f1e7] rounded-sm flex items-center justify-center">
                  <Image
                    src="/images/website-icon.png"
                    alt="Location icon"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: "9.8rem", fontWeight: "900" }}>JOIN US!</h1>
      </div>
      <div className="flex flex-row gap-40 text-xs">
        <div>
          <p>© The James Foundation 2025</p>
        </div>
        <div className="flex flex-row gap-8">
          <Link href={siteMetadata.facebook} className="hover:text-[#9c9a94]">Facebook</Link>
          <Link href={siteMetadata.twitter} className="hover:text-[#9c9a94]">Twitter</Link>
          <Link href={siteMetadata.youtube} className="hover:text-[#9c9a94]">YouTube</Link>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 ">
        <div
          style={{
            borderBottom: "1px #f4f1e7 solid",
            borderLeft: "1px #f4f1e7 solid",
            borderRight: "1px #f4f1e7 solid",
          }}
          className="h-4 rounded-sm w-[87%]"
        ></div>
        <p className="text-xs">Empowering International Students</p>
      </div>
    </footer>
  );
};

export default Footer;
