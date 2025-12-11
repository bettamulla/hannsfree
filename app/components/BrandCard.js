"use client";

export default function BrandCard({ brand }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-medium text-lg">{brand.name}</h3>
    </div>
  );
}
