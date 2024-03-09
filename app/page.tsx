"use client";

import Image from "next/image";
import checkWhitelist from "@/actions/checkWhitelist";
import csx from "@/util/csx";
import { useState } from "react";

type Eligibility = boolean | null;

function NotEligible() {
  return (
    <div
      className={csx(
        "text-sm p-4 my-2 rounded bg-apered border border-apered bg-opacity-50"
      )}
    >
      Sorry, your wallet is not eligible. If you think this is a mistake, open a
      ticket on <Link href="https://discord.gg/eZwT2JCeYY">our Discord</Link>.
    </div>
  );
}

function Eligible() {
  return (
    <div
      className={csx(
        "text-sm p-4 my-2 rounded bg-apegreen border border-apegreen bg-opacity-50"
      )}
    >
      Your wallet is eligible! :&#41;
    </div>
  );
}

function MintDetail({
  name,
  className,
  children,
}: {
  name: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-x-5 text-md md:text-lg">
      <div className="w-[140px] font-bold">
        <div className={className}>{name}</div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}

function MintDetails() {
  return (
    <div className={csx("flex flex-col items-center p-4 mb-4")}>
      <h1 className="text-2xl md:text-3xl mb-4 finger-paint uppercase text-[#f5eabd]">
        - What is Ape Boys Club? -
      </h1>
      <div className="text-md md:text-xl mb-6 mukta">
        <p className="text-justify">
          The Ape Boys Club is a Limited collection of 1,500 unique Ape Boy NFTs
          unique digital collectibles living on the Injective blockchain. Your
          Ape Boy doubles as your Ape Boys Club membership card, and grants
          access to members-only benefits.
        </p>
      </div>
      <h1 className="text-2xl md:text-3xl mb-4 finger-paint uppercase text-[#f5eabd]">
        - Mint Details -
      </h1>
      <div className="flex flex-col mukta">
        <MintDetail name="Supply">1500 NFTs</MintDetail>
        <MintDetail name="Premium Ape" className="text-[#a8ff00]">
          Freemint <i>&#40;Max 2 per wallet&#41;</i>
        </MintDetail>
        <MintDetail name="Original Ape (OG)" className="text-[#e67e22]">
          Freemint <i>&#40;Max 1 per wallet&#41;</i>
        </MintDetail>
        <MintDetail name="Whitelist">
          0.3 $INJ <i>&#40;Max 3 per wallet&#41;</i>
        </MintDetail>
        <MintDetail name="Public">0.6 $INJ</MintDetail>
        <MintDetail name="Mint Date">15/03/2024 19.30 UTC</MintDetail>
        <MintDetail name="Marketplace">
          <a href="#">Talis Protocol</a>
        </MintDetail>
      </div>
    </div>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#f5eabd] hover:underline transition duration-100"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isOnWhitelist, setIsOnWhitelist] = useState<Eligibility>(null);

  return (
    <main className="flex flex-col md:h-full items-center justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <Image
          className="mx-8 hidden md:block"
          src="/abc_mosaic.png"
          height={630}
          width={630}
          alt="ApeBoysClub"
          priority
        />
        <Image
          className="m-8 mb-4 md:hidden"
          src="/abc_mosaic.png"
          height={300}
          width={300}
          alt="ApeBoysClub"
          priority
        />
        <div className="relative flex flex-col px-8 w-full md:w-[600px] mb-12 md:mb-0">
          <MintDetails />
          <div className="text-md md:text-lg pb-2 mukta">
            Paste your Injective address to see if you&#39;re on the whitelist:
          </div>
          <input
            className={csx(
              "p-3 my-2",
              "rounded-lg text-white",
              "bg-transparent",
              "border-borderwhite border-2"
            )}
            type="text"
            placeholder="Your Injective Address"
            onChange={(e) => {
              if (!e.currentTarget.value) {
                setIsInputEmpty(true);
              } else {
                checkWhitelist(e.currentTarget.value).then((value) => {
                  setIsOnWhitelist(value);
                  setIsInputEmpty(false);
                });
              }
            }}
          />
          {isInputEmpty ? null : isOnWhitelist === false ? (
            <NotEligible />
          ) : isOnWhitelist === true ? (
            <Eligible />
          ) : null}
        </div>
      </div>
    </main>
  );
}
