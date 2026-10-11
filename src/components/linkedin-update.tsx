import Image from "next/image";

/*
  LinkedIn post block for institutional partner profiles.

  Three honest states:
  - no post URL: a clearly labelled placeholder with a config hint, so nothing
    is fabricated and the real post is one line away in site.ts.
  - post URL, no embed URL: a clean preview with a View on LinkedIn link that
    opens the original post in a new tab.
  - post URL + embed URL: LinkedIn's official iframe embed, with the View on
    LinkedIn link kept in the header as the fallback if the embed is blocked.

  Nothing here invents a post, URL or engagement figure.
*/
export function LinkedInUpdate({
  postUrl,
  embedUrl,
  logo,
}: {
  postUrl: string;
  embedUrl?: string;
  /* Partner logo shown in the pending state so the block is never blank. */
  logo?: string;
}) {
  const hasPost = Boolean(postUrl);
  const hasEmbed = hasPost && Boolean(embedUrl);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-8 py-4">
        <span className="flex items-center gap-2 text-sm font-bold text-[#0a66c2]">
          <i className="fa-brands fa-linkedin text-base" aria-hidden="true" />
          LinkedIn
        </span>
        {hasPost ? (
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-2 text-xs font-bold text-white transition duration-300 ease-gentle hover:bg-[#004182] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2"
          >
            View on LinkedIn
            <span aria-hidden="true">&#8599;</span>
          </a>
        ) : null}
      </div>

      <div className="p-8">
        {hasEmbed ? (
          <div>
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{ paddingBottom: "125%" }}
            >
              <iframe
                src={embedUrl}
                title="Next360 and SR University partnership post on LinkedIn"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-sm leading-relaxed text-gray-600">
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0a66c2] hover:underline"
              >
                View the Partnership Announcement on LinkedIn
              </a>
            </p>
          </div>
        ) : hasPost ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a66c2] text-white"
              aria-hidden="true"
            >
              <i className="fa-brands fa-linkedin text-xl" />
            </span>
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              This partnership update is published on LinkedIn. Open the
              original post to read it in full.
            </p>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-5 py-2.5 text-sm font-bold text-white transition duration-300 ease-gentle hover:bg-[#004182]"
            >
              View on LinkedIn
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
            {logo ? (
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3">
                <Image
                  src={logo}
                  alt="Partner logo"
                  width={112}
                  height={112}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <span
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-300"
                aria-hidden="true"
              >
                <i className="fa-brands fa-linkedin text-xl" />
              </span>
            )}
            <p className="mt-4 text-sm font-bold text-gray-700">
              Partnership announcement pending
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
              A verified LinkedIn post from Next360 or SR University will be
              embedded here. Set <code>linkedinPost</code> in{" "}
              <code>src/lib/site.ts</code> to publish it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
