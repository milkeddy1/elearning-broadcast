"use client";
import Image from "next/image";
import { CalendarIcon, ClockIcon, Video as VideoIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { clientAxiosInstance } from "@/app/api";
import getPreviewImgs from "@/utils/getYTPreviewImage";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "./spinner";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type VideoResponse = {
  data: {
    id: string;
    url: string;
    schoolId: string;
    name: string;
    remark: string | null;
    expiredDate: string | null;
    studentViewRatio: string;
    sawAfterJoin: boolean;
    createdAt: string;
    updatedAt: string;
    packedUrl: string | null;
  }[];
  pagination: {
    total: number;
  };
};

export default function VideoList() {
  const [queryLimit, setQueryLimit] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("keyword");
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  console.log(searchParams, "searchParams");

  const handleSubmit = () => {
    router.push(pathname + "?" + createQueryString("keyword", searchQuery));
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["videos", { limit: queryLimit }],
    queryFn: async ({ pageParam }) => {
      if (!queryLimit) return;
      const res = await clientAxiosInstance.get("/api/video", {
        params: { limit: queryLimit, offset: (pageParam - 1) * queryLimit },
      });
      return res.data;
    },
    initialPageParam: 1,
    enabled: !!queryLimit,
    getNextPageParam: (lastPage: VideoResponse, allPages: VideoResponse[]) => {
      // 判斷是否為最後一頁
      if (lastPage.pagination.total <= allPages.map((i) => i.data).flat().length) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const videos =
    data?.pages
      .map((i) => i.data)
      .flat()
      .filter((item) => {
        return searchKeyword ? item.name.includes(searchKeyword) : item;
      }) || [];

  const getImagesPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 8; // 大螢幕顯示 4 個圖片
    if (width >= 1024) return 6; // 中螢幕顯示 3 個圖片
    if (width >= 768) return 4; // 平板顯示 2 個圖片
    return 2; // 手機顯示 1 個圖片
  };

  useEffect(() => {
    // 根據 layout 的寬度，設定每次 fetch 的數量
    const handleResize = () => {
      setQueryLimit(getImagesPerRow());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex gap-8 align-center flex-col">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold mb-6">影片列表</h1>
        <Button>重新整理</Button>
      </div>

      <div className="flex gap-4 w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="輸入搜索內容..."
          name="keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
          aria-label="搜索輸入"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button onClick={handleSubmit}>搜索</Button>
      </div>

      {isLoading ? (
        <div className="m-auto">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => {
              return (
                <div key={video.id} className="bg-background rounded-lg shadow-md overflow-hidden group border ">
                  <div className="relative overflow-hidden w-full aspect-video">
                    {getPreviewImgs(video.url)?.mq ? (
                      <Image
                        className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-full"
                        src={getPreviewImgs(video.url)?.mq || ""}
                        alt={video.name}
                        // height={180}
                        // width={320}
                        layout="fill"
                      />
                    ) : (
                      <div className="h-full flex justify-center items-center">
                        <VideoIcon size={100} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{video.name}</h2>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>發布：{video.createdAt}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span>到期：{video.expiredDate}</span>
                    </div>
                    <p className="text-sm text-gray-700">{video.remark}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {hasNextPage && (
            <div ref={ref} className="m-auto">
              <Spinner />
            </div>
          )}
        </>
      )}
    </div>
  );
}
