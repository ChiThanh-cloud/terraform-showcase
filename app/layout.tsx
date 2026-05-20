import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tự động hoá quá trình xây dựng hạ tầng cloud trên aws sử dụng Terraform",
  description:
    "Website trình diễn hạ tầng cloud cấp production cho Terraform, AWS, GitHub Actions, CloudWatch và tự động hóa DevOps.",
  keywords: [
    "Terraform",
    "AWS",
    "Hạ tầng dưới dạng mã",
    "GitHub Actions",
    "CloudWatch",
    "DevOps"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body>{children}</body>
    </html>
  );
}
