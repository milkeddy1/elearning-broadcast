"use client";
import Image from "next/image";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { clientAxiosInstance } from "@/app/api";
import getPreviewImgs from "@/utils/getYTPreviewImage";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";
import { useInView } from "react-intersection-observer";

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
  console.log(queryLimit, "queryLimit");

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

  const videos = data?.pages.map((i) => i.data).flat() || [];

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
                  <div className="relative overflow-hidden">
                    <Image
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-full"
                      src={getPreviewImgs(video.url)?.mq || ""}
                      alt={video.name}
                      height={180}
                      width={200}
                    />
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
