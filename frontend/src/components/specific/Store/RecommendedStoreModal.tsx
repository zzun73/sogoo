import React from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../common/Modal";

interface Store {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  rating: number;
  subscriptionPrice: number;
}

interface RecommendStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecommendStoreModal = ({ isOpen, onClose }: RecommendStoreModalProps) => {
  const {
    data: recommendedStores,
    isLoading,
    error,
  } = useQuery<Store[]>({
    queryKey: ["recommendedStores"],
    queryFn: async () => {
      const response = await fetch("/api/stores/recommended");
      if (!response.ok) {
        throw new Error("Failed to fetch recommended stores");
      }
      return response.json();
    },
  });

  if (error) {
    console.error("Error fetching recommended stores:", error);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">추천 매장</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            매장 정보를 불러오는데 실패했습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {recommendedStores?.map((store) => (
              <div
                key={store.id}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {store.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {store.category}
                    </span>
                    <div className="text-right">
                      <div className="text-yellow-500">
                        {"★".repeat(Math.round(store.rating))}
                      </div>
                      <div className="text-sm font-semibold">
                        월 {store.subscriptionPrice.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RecommendStoreModal;
