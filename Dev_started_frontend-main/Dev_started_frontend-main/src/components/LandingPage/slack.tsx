import Image from "next/image";
import Link from "next/link";

export default function JoinSlack() {
  return (
    <div className="fixed right-6 bottom-24 rounded-full bg-white p-2">
      <Link
        href={
          "https://join.slack.com/t/thedevstarter/shared_invite/zt-29xe3325j-y1RRcoDhpfuAusVBWX1Wxg"
        }
        target="_blank"
      >
        <Image
          src="/icons/slack.svg"
          alt="Join thedevstarter's slack"
          height={40}
          width={40}
        />
      </Link>
    </div>
  );
}
