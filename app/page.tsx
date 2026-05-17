"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Cloud,
  Database,
  FileCode2,
  GitBranch,
  Github,
  Globe2,
  HardDrive,
  LockKeyhole,
  Network,
  Radar,
  RefreshCcw,
  Rocket,
  Scale,
  Server,
  ShieldCheck,
  TerminalSquare,
  Zap
} from "lucide-react";
import { AnimatedGrid } from "@/components/magic/animated-grid";
import { NumberTicker } from "@/components/magic/number-ticker";
import { SectionShell } from "@/components/magic/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navItems = [
  ["Vấn đề", "#problem"],
  ["Terraform", "#terraform"],
  ["AWS", "#services"],
  ["Kiến trúc", "#architecture"],
  ["CI/CD", "#pipeline"],
  ["Giám sát", "#monitoring"],
  ["Bảo mật", "#security"]
];

const teamMembers = ["Huỳnh Tiến Đạt", "Trần Quốc Dũng", "Nguyễn Chí Thành"];

const problems = [
  {
    icon: TerminalSquare,
    title: "Rủi ro triển khai thủ công",
    text: "Các thay đổi qua console khó tái tạo, dễ cấu hình sai và khó kiểm toán giữa nhiều môi trường."
  },
  {
    icon: Scale,
    title: "Giới hạn khả năng mở rộng",
    text: "Provision thủ công làm chậm quá trình mở rộng khi lưu lượng, môi trường hoặc phụ thuộc dịch vụ tăng lên."
  },
  {
    icon: RefreshCcw,
    title: "Cấu hình thiếu nhất quán",
    text: "Các nhóm khác nhau có thể tạo VPC, IAM policy, security group và cấu hình runtime không đồng nhất."
  },
  {
    icon: Network,
    title: "Độ phức tạp triển khai",
    text: "Hệ thống AWS hiện đại kết nối edge, compute, dữ liệu, bảo mật và quan sát, cần triển khai có điều phối."
  }
];

const terraformBenefits = [
  ["Infrastructure as Code", "Tài nguyên cloud được khai báo, version hóa, review và triển khai giống như mã ứng dụng."],
  ["Tự động hóa", "Terraform tạo plan và apply thay đổi hạ tầng theo quy trình có thể dự đoán."],
  ["Tính nhất quán", "Module giúp các môi trường đồng bộ và giảm drift cấu hình."],
  ["Khả năng mở rộng", "Mẫu tái sử dụng giúp mở rộng dịch vụ và vùng triển khai dễ hơn."],
  ["Hạ tầng module hóa", "VPC, compute, storage, database, bảo mật và giám sát có thể ghép nối rõ ràng."],
  ["Tích hợp CI/CD", "GitHub Actions có thể validate, plan, phê duyệt và apply các thay đổi Terraform."]
];

const awsServices = [
  [Globe2, "CloudFront", "Phân phối traffic ứng dụng qua edge toàn cầu."],
  [Network, "ALB", "Định tuyến Layer 7 đến các đích ứng dụng."],
  [Server, "EC2", "Năng lực compute cho workload và node hỗ trợ."],
  [Scale, "Auto Scaling Group", "Tự động co giãn tài nguyên theo nhu cầu."],
  [Database, "RDS", "Lớp cơ sở dữ liệu quan hệ được quản lý."],
  [HardDrive, "S3", "Lưu trữ đối tượng và backend lưu Terraform state."],
  [LockKeyhole, "IAM", "Quản lý danh tính và quyền truy cập theo least privilege."],
  [ShieldCheck, "WAF", "Bảo vệ ứng dụng ở lớp edge."],
  [Activity, "CloudWatch", "Metrics, logs, alarms và khả năng quan sát sức khỏe hệ thống."]
];

const pipeline = [
  ["Nhà phát triển", GitBranch],
  ["GitHub Actions", Github],
  ["Terraform Validate", CheckCircle2],
  ["Terraform Plan", FileCode2],
  ["Terraform Apply", Rocket],
  ["Triển khai AWS", Cloud],
  ["Giám sát CloudWatch", Radar]
];

const metrics = [
  { label: "Requests qua ALB", value: 12840, suffix: "/phút", tone: "cyan" },
  { label: "Sức khỏe EC2", value: 99, suffix: "%", tone: "emerald" },
  { label: "CPU EC2 trung bình", value: 42, suffix: "%", tone: "amber" },
  { label: "Độ trễ P95", value: 184, suffix: "ms", tone: "orange" }
];

const architectureAlerts = [
  {
    id: "cloudfront",
    label: "CloudFront",
    status: "healthy",
    statusText: "Cache healthy",
    detail: "Edge delivery ổn định, cache hit rate tốt và không có spike lỗi từ edge.",
    metric: "cache hit: 91%",
    position: "left-[18%] top-[40%]"
  },
  {
    id: "alb",
    label: "ALB",
    status: "healthy",
    statusText: "Routing normal",
    detail: "Routing ổn định, target group EC2 nhận traffic đều và 5xx rate thấp.",
    metric: "5xx: 0.03%",
    position: "left-[40%] top-[43%]"
  },
  {
    id: "ec2",
    label: "EC2",
    status: "critical",
    statusText: "CPU elevated",
    detail: "EC2 instance health vẫn pass, nhưng CPU đang tăng sau deployment. Cần theo dõi Auto Scaling policy.",
    metric: "cpu: 74%",
    position: "left-[57%] top-[39%]"
  },
  {
    id: "rds",
    label: "RDS",
    status: "warning",
    statusText: "High CPU",
    detail: "RDS high CPU vượt threshold trong 2 evaluation periods. Cần kiểm tra query latency và connection count.",
    metric: "cpu: 87%",
    position: "left-[66%] top-[63%]"
  },
  {
    id: "cloudwatch",
    label: "CloudWatch",
    status: "warning",
    statusText: "2 alarms",
    detail: "CloudWatch đang theo dõi EC2 CPU, RDS CPU, ALB 5xx, logs và metrics vận hành.",
    metric: "alarms: 2",
    position: "left-[80%] top-[29%]"
  }
] as const;

const securityItems = [
  [LockKeyhole, "IAM", "Role và policy theo least privilege giúp giảm rủi ro truy cập trái phép."],
  [ShieldCheck, "WAF", "Lọc traffic ở edge để bảo vệ endpoint public khỏi mẫu truy cập độc hại."],
  [Network, "Security Groups", "Quy tắc mạng giới hạn kết nối inbound và outbound."],
  [Database, "Private Subnets", "Workload và dữ liệu nhạy cảm được cô lập khỏi truy cập public trực tiếp."],
  [CheckCircle2, "Least Privilege", "Mỗi workflow và dịch vụ chỉ nhận đúng quyền cần thiết để vận hành."],
  [HardDrive, "State Locking", "Remote state locking ngăn các thay đổi Terraform đồng thời làm hỏng state."]
];

const comparison = [
  {
    criteria: "Hỗ trợ cloud",
    terraform: ["Multi-cloud", " và hybrid workflow"],
    cloudFormation: ["AWS-only", " infrastructure stack"]
  },
  {
    criteria: "Ngôn ngữ",
    terraform: ["HCL", " dễ đọc, thiết kế cho IaC"],
    cloudFormation: ["JSON/YAML", " template"]
  },
  {
    criteria: "Mô hình state",
    terraform: ["Remote state", " với explicit locking"],
    cloudFormation: ["AWS-managed", " stack state"]
  },
  {
    criteria: "Tái sử dụng",
    terraform: ["Reusable modules", " và module registry lớn"],
    cloudFormation: ["Nested stack", " và pattern đặc thù AWS"]
  },
  {
    criteria: "CI/CD",
    terraform: ["Plan/apply gate", " mạnh để review"],
    cloudFormation: ["AWS-native", " deployment support"]
  },
  {
    criteria: "Phù hợp nhất",
    terraform: ["DevOps automation", " linh hoạt, dễ mở rộng"],
    cloudFormation: ["AWS-native", " team và stack thuần AWS"]
  }
];

function FadeCard({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MetricTile({
  label,
  value,
  suffix,
  tone
}: {
  label: string;
  value: number;
  suffix: string;
  tone: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{label}</p>
          <span
            className={cn(
              "size-2 rounded-full",
              tone === "emerald" && "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]",
              tone === "amber" && "bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.85)]",
              tone === "orange" && "bg-orange-300 shadow-[0_0_12px_rgba(253,186,116,0.85)]",
              tone === "cyan" && "bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]"
            )}
          />
        </div>
        <div className="mt-4 font-mono text-2xl font-semibold">
          <NumberTicker value={value} suffix={suffix} />
        </div>
      </CardContent>
    </Card>
  );
}


function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedGrid />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.18),transparent_28rem),radial-gradient(circle_at_82%_28%,rgba(251,146,60,0.14),transparent_24rem)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-background/60 px-4 py-3 backdrop-blur-xl">
          <a href="#" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Cloud className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Terraform AWS Infrastructure Platform</p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Nền tảng trình diễn hạ tầng Terraform + AWS
              </p>
            </div>
          </a>
          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" variant="outline">
            <a href="#architecture">
              <Radar />
              Khám phá
            </a>
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Badge>
              <Zap className="size-3" />
              Bài trình bày dự án nghiên cứu
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-normal text-balance sm:text-5xl lg:text-6xl">
              Tự động hóa hạ tầng AWS bằng Terraform
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Bài trình diễn nghiên cứu DevOps chuyên nghiệp về tự động hóa
              provisioning hạ tầng AWS, triển khai CI/CD, giám sát và bảo mật
              bằng Terraform.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh</CardTitle>
                  <CardDescription>Bài trình bày nghiên cứu hạ tầng cloud</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>ThS. Phạm Đằng Phương</CardTitle>
                  <CardDescription>Giảng viên hướng dẫn</CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {teamMembers.map((member) => (
                <Badge key={member} variant="secondary">
                  {member}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="rounded-lg border border-cyan-300/25 bg-slate-950/82 p-4 shadow-[0_0_58px_rgba(34,211,238,0.16)] backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-300" />
                <span className="size-3 rounded-full bg-emerald-300" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                terraform apply --auto-approve
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Plan", "+24 tài nguyên", FileCode2],
                ["Apply", "4m 12s", Rocket],
                ["State", "đã khóa", LockKeyhole],
                ["Alarms", "3 đang bật", BellRing]
              ].map(([title, detail, Icon]) => (
                <div key={title as string} className="rounded-lg border border-border/70 bg-background/55 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{title as string}</p>
                    <Icon className="size-4 text-cyan-200" />
                  </div>
                  <p className="mt-3 font-mono text-xl font-semibold">{detail as string}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-border/70 bg-background/55 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium">Tiến độ triển khai</p>
                <Badge variant="success">ổn định</Badge>
              </div>
              <div className="space-y-3">
                {["Mạng VPC", "WAF + CloudFront", "EC2 instances", "CloudWatch alarms"].map(
                  (item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${94 - index * 7}%` }}
                          transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-orange-300"
                        />
                      </div>
                      <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                        {94 - index * 7}%
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MainArchitecture() {
  const [selectedNode, setSelectedNode] = useState<(typeof architectureAlerts)[number]>(architectureAlerts[4]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative overflow-hidden rounded-lg border border-cyan-300/30 bg-slate-950/72 p-3 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_0_54px_rgba(34,211,238,0.18),0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-4"
    >
      <div className="absolute inset-0 dashboard-grid opacity-30" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
      <div className="absolute -inset-16 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.16),transparent_30rem),radial-gradient(circle_at_90%_16%,rgba(251,146,60,0.12),transparent_26rem)]" />

      <div className="relative mb-3 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border/70 bg-background/50 px-3 py-2 backdrop-blur">
        <Badge variant="success">
          <Activity className="size-3" />
          Kiến trúc chính
        </Badge>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="size-2 animate-pulse-dot rounded-full bg-red-300 shadow-[0_0_12px_rgba(248,113,113,0.85)]" />
          CloudWatch alarms: 3
          <span className="hidden text-border sm:inline">|</span>
          <span>Traffic flow: live</span>
        </div>
      </div>

      <div className="relative grid gap-3">
        <div className="relative overflow-hidden rounded-lg border border-border/80 bg-black/35 transition duration-300 hover:border-cyan-300/45">
          <Image
            src="/architecture/aws-architecture.png"
            alt="Sơ đồ kiến trúc AWS cho tự động hóa Terraform với GitHub Actions, CloudFront, WAF, ALB, EC2, RDS, S3, IAM và CloudWatch"
            width={1672}
            height={941}
            priority
            unoptimized
            className="h-auto w-full object-contain transition duration-500 hover:scale-[1.005]"
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="traffic-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.02" />
                <stop offset="48%" stopColor="#67e8f9" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            {[
              "M115 105 C240 90 310 100 390 135",
              "M392 140 C475 190 525 215 590 250",
              "M593 252 C665 292 735 305 814 214",
              "M620 288 C660 345 670 390 700 438",
              "M452 412 C560 450 650 460 805 260"
            ].map((path, index) => (
              <motion.path
                key={path}
                d={path}
                fill="none"
                stroke="url(#traffic-flow)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="8 18"
                initial={{ strokeDashoffset: 120 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </svg>
          <div className="absolute inset-0">
            {architectureAlerts.map((node) => {
              const isCritical = node.status === "critical";
              const isWarning = node.status === "warning";
              const isSelected = selectedNode.id === node.id;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  whileHover={{ scale: 1.35 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedNode(node)}
                  className={cn(
                    "group absolute z-10 flex size-2.5 items-center justify-center rounded-full border opacity-80 transition hover:opacity-100 sm:size-3",
                    node.position,
                    isCritical
                      ? "border-red-200/70 bg-red-400/75 shadow-[0_0_8px_rgba(248,113,113,0.36)]"
                      : isWarning
                        ? "border-orange-200/70 bg-orange-300/75 shadow-[0_0_8px_rgba(251,146,60,0.3)]"
                        : "border-cyan-100/70 bg-cyan-300/70 shadow-[0_0_7px_rgba(34,211,238,0.24)]",
                    isSelected && "ring-1 ring-white/45"
                  )}
                  aria-label={`Show alert details for ${node.label}`}
                >
                  {(isCritical || isWarning) && (
                    <motion.span
                      className={cn(
                        "absolute inset-[-5px] rounded-full border",
                        isCritical ? "border-red-300/35" : "border-orange-300/30"
                      )}
                      animate={{ opacity: [0.12, 0.7, 0.12], scale: [0.88, 1.48, 0.88] }}
                      transition={{
                        duration: isCritical ? 1.15 : 1.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border/70 bg-slate-950/95 px-2.5 py-1.5 text-[11px] text-slate-100 shadow-panel group-hover:block">
                    {node.label} - {node.statusText}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "relative overflow-hidden rounded-lg border bg-slate-950/72 px-4 py-3 backdrop-blur-xl",
            selectedNode.status === "critical"
              ? "border-red-300/25"
              : selectedNode.status === "warning"
                ? "border-orange-300/25"
                : "border-cyan-300/25"
          )}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    selectedNode.status === "critical"
                      ? "bg-red-300"
                      : selectedNode.status === "warning"
                        ? "bg-orange-300"
                        : "bg-cyan-300"
                  )}
                />
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  {selectedNode.label} / {selectedNode.statusText}
                </p>
                <span className="rounded-md border border-border/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {selectedNode.metric}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedNode.detail}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-border/70 px-2.5 py-1.5 font-mono">source: CloudWatch</span>
              <span className="rounded-md border border-border/70 px-2.5 py-1.5 font-mono">click marker</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-4 grid gap-4 lg:grid-cols-3">
        {[
          ["Từ source đến cloud", "GitHub Actions kích hoạt workflow validate, plan, phê duyệt và apply Terraform."],
          ["Môi trường production", "CloudFront, WAF, ALB, EC2, RDS, S3, IAM và Auto Scaling tạo nên nền tảng AWS."],
          ["Khả năng quan sát vận hành", "CloudWatch khép kín vòng phản hồi bằng metrics, logs, alarms và tín hiệu sức khỏe."]
        ].map(([title, text]) => (
          <Card key={title} className="bg-background/55">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <SectionShell
        id="problem"
        eyebrow="Vấn đề cần giải quyết"
        title="Hạ tầng cloud triển khai thủ công khó đáp ứng kỳ vọng DevOps hiện đại."
        description="Provision AWS theo cách truyền thống tạo rủi ro vận hành khi môi trường cần có khả năng lặp lại, bảo mật, quan sát được và triển khai nhanh."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeCard key={item.title} delay={index * 0.06}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-orange-300/30 bg-orange-400/10 text-orange-200">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.text}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeCard>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell
        id="terraform"
        eyebrow="Vì sao chọn Terraform"
        title="Terraform biến hạ tầng AWS thành mã tự động, dễ lặp lại và dễ review."
        description="Dự án chọn Terraform vì kết hợp IaC dạng khai báo, module tái sử dụng, remote state và các deployment gate thân thiện với CI/CD."
        className="bg-slate-950/35"
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {terraformBenefits.map(([title, text], index) => (
              <FadeCard key={title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{text}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeCard>
            ))}
          </div>
          <Card className="relative overflow-hidden bg-slate-950/85">
            <AnimatedGrid className="opacity-25" />
            <CardHeader className="relative">
              <CardTitle>Quy trình Terraform</CardTitle>
              <CardDescription>
                Luồng có kiểm soát từ thay đổi source đến hạ tầng được giám sát.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative grid gap-3">
              {["Viết HCL", "terraform fmt + validate", "terraform plan", "phê duyệt thủ công", "terraform apply", "phản hồi từ CloudWatch"].map(
                (step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/55 p-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-md bg-primary/15 font-mono text-xs text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </motion.div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </SectionShell>

      <SectionShell
        id="services"
        eyebrow="Dịch vụ AWS"
        title="Phần trình diễn kết nối edge, compute, scaling, dữ liệu, bảo mật và observability."
        description="Mỗi card dịch vụ đại diện cho một phần của nền tảng AWS kiểu production được tự động hóa bằng Terraform."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {awsServices.map(([Icon, title, text], index) => (
            <FadeCard key={title as string} delay={index * 0.035}>
              <Card className="h-full transition duration-300 hover:border-cyan-300/45 hover:shadow-glow">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{title as string}</CardTitle>
                  <CardDescription>{text as string}</CardDescription>
                </CardHeader>
              </Card>
            </FadeCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="architecture"
        eyebrow="Kiến trúc chính"
        title="Kiến trúc AWS tổng thể được xây quanh sơ đồ kỹ thuật đã cung cấp."
        description="Ảnh kiến trúc là phần kỹ thuật chính, hiển thị toàn chiều rộng trong panel vận hành glassmorphism với viền phát sáng và responsive scaling."
        className="bg-slate-950/35"
      >
        <MainArchitecture />
      </SectionShell>

      <SectionShell
        id="pipeline"
        eyebrow="Pipeline CI/CD"
        title="Thay đổi hạ tầng đi qua một chuỗi deployment rõ ràng."
        description="Pipeline nhấn mạnh validate, review, deployment và monitoring trước khi thay đổi hạ tầng được xem là hoàn tất."
      >
        <div className="grid gap-3 lg:grid-cols-7">
          {pipeline.map(([label, Icon], index) => (
            <FadeCard key={label as string} delay={index * 0.05}>
              <Card className="relative h-full overflow-hidden">
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{label as string}</CardTitle>
                </CardHeader>
                {index < pipeline.length - 1 && (
                  <ArrowDown className="absolute right-4 top-5 hidden size-5 text-cyan-200 lg:block lg:-rotate-90" />
                )}
              </Card>
            </FadeCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="monitoring"
        eyebrow="Giám sát"
        title="CloudWatch cung cấp khả năng quan sát sau mỗi lần triển khai."
        description="Metrics, logs, health checks, tín hiệu hiệu năng và alarms biến hạ tầng thành một nền tảng có thể quan sát."
        className="bg-slate-950/35"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/70">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Dashboard vận hành CloudWatch</CardTitle>
                  <CardDescription>Widget kiểu live cho service health và theo dõi hiệu năng.</CardDescription>
                </div>
                <Badge variant="success">
                  <Activity className="size-3" />
                  đang stream
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <MetricTile key={metric.label} {...metric} />
                ))}
              </div>
              <div className="mt-5 h-48 rounded-lg border border-border/70 bg-background/45 p-4 fine-grid">
                <div className="flex h-full items-end gap-2">
                  {[38, 48, 44, 62, 54, 73, 58, 82, 64, 71, 51, 68, 60, 76].map(
                    (height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.035 }}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-400/30 via-blue-300/70 to-orange-300/85"
                      />
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[
              [BellRing, "Alarms", "Threshold cảnh báo thông báo cho đội vận hành về CPU, target health, lỗi 5xx và độ trễ."],
              [HardDrive, "Logs", "Logs ứng dụng và hạ tầng được tập trung để phục vụ điều tra sự cố."],
              [Activity, "Theo dõi sức khỏe", "EC2 instance health và trạng thái ALB target thể hiện độ ổn định runtime."],
              [Radar, "Tầm nhìn hạ tầng", "Dashboard giúp tài nguyên đã triển khai dễ theo dõi hơn sau mỗi lần apply."]
            ].map(([Icon, title, text]) => (
              <Card key={title as string}>
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle>{title as string}</CardTitle>
                    <CardDescription className="mt-2">{text as string}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="security"
        eyebrow="Bảo mật"
        title="Tự động hóa cloud cấp doanh nghiệp cần tích hợp security control ngay trong mô hình hạ tầng."
        description="Terraform mã hóa quyền truy cập, ranh giới mạng, lọc edge, workload private và an toàn state như một phần của workflow triển khai."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {securityItems.map(([Icon, title, text], index) => (
            <FadeCard key={title as string} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-200">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle>{title as string}</CardTitle>
                    <CardDescription className="mt-2">{text as string}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </FadeCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="comparison"
        eyebrow="Terraform vs CloudFormation"
        title="Terraform được chọn vì tự động hóa hạ tầng linh hoạt, tái sử dụng tốt và thân thiện với CI/CD."
        description="CloudFormation mạnh với stack AWS-native, còn Terraform hỗ trợ tốt hơn cho workflow module hóa, định hướng multi-cloud và quy trình review plan/apply."
        className="bg-slate-950/35"
      >
        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <FadeCard>
            <Card className="overflow-hidden border-cyan-300/20 bg-slate-950/82 shadow-[0_0_44px_rgba(34,211,238,0.08)]">
              <div className="grid grid-cols-[0.82fr_1.18fr_1fr] border-b border-border/70 bg-secondary/35 text-sm font-semibold">
                <div className="p-4 text-muted-foreground">Tiêu chí</div>
                <div className="border-l border-cyan-300/20 bg-cyan-400/10 p-4 text-primary">
                  Terraform
                  <span className="ml-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 font-mono text-[11px] text-cyan-100">
                    selected
                  </span>
                </div>
                <div className="border-l border-orange-300/20 bg-orange-400/10 p-4 text-orange-200">
                  CloudFormation
                </div>
              </div>
              {comparison.map((row, index) => (
                <motion.div
                  key={row.criteria}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.035 }}
                  className="group grid grid-cols-[0.82fr_1.18fr_1fr] border-b border-border/50 text-sm transition last:border-b-0 hover:bg-cyan-300/[0.035]"
                >
                  <div className="p-4 font-medium text-slate-100">{row.criteria}</div>
                  <div className="border-l border-cyan-300/20 bg-cyan-400/[0.035] p-4 text-muted-foreground transition group-hover:bg-cyan-300/[0.08] group-hover:shadow-[inset_2px_0_0_rgba(103,232,249,0.7)]">
                    <span className="font-semibold text-cyan-100">{row.terraform[0]}</span>
                    {row.terraform[1]}
                  </div>
                  <div className="border-l border-orange-300/20 p-4 text-muted-foreground transition group-hover:bg-orange-300/[0.045]">
                    <span className="font-semibold text-orange-100">{row.cloudFormation[0]}</span>
                    {row.cloudFormation[1]}
                  </div>
                </motion.div>
              ))}
            </Card>
          </FadeCard>

          <div className="grid gap-4">
            <FadeCard delay={0.05}>
              <Card className="relative overflow-hidden border-cyan-300/25 bg-slate-950/82 transition duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_46px_rgba(34,211,238,0.14)]">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                <CardHeader>
                  <Badge>
                    <Rocket className="size-3" />
                    Selected solution
                  </Badge>
                  <CardTitle className="mt-3">Why Terraform Was Selected</CardTitle>
                  <CardDescription>
                    Terraform phù hợp hơn với mục tiêu DevOps automation, module reuse và CI/CD review gate của dự án.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {[
                    [FileCode2, "Reusable modules", "Module hóa VPC, compute, data, security và monitoring."],
                    [Github, "CI/CD integration", "Tích hợp tự nhiên với GitHub Actions validate, plan và apply."],
                    [Scale, "Scalable automation", "Mở rộng môi trường và service bằng pattern có thể lặp lại."],
                    [Globe2, "Multi-cloud flexibility", "Giảm vendor lock-in và hỗ trợ định hướng hybrid/multi-cloud."]
                  ].map(([Icon, title, text], index) => (
                    <motion.div
                      key={title as string}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="flex gap-3 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.045] p-3 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-cyan-300/10 text-cyan-100">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-cyan-50">{title as string}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{text as string}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </FadeCard>

            {[
              {
                title: "Terraform workflow",
                tone: "cyan",
                nodes: ["Developer", "GitHub Actions", "Terraform Plan", "Terraform Apply", "AWS"]
              },
              {
                title: "CloudFormation workflow",
                tone: "orange",
                nodes: ["Developer", "CloudFormation Stack", "AWS Native Deployment"]
              }
            ].map((flow, flowIndex) => (
              <FadeCard key={flow.title} delay={0.1 + flowIndex * 0.05}>
                <Card
                  className={cn(
                    "overflow-hidden transition duration-300",
                    flow.tone === "cyan"
                      ? "border-cyan-300/25 bg-cyan-300/[0.035] hover:border-cyan-300/45 hover:shadow-[0_0_36px_rgba(34,211,238,0.12)]"
                      : "border-orange-300/25 bg-orange-300/[0.035] hover:border-orange-300/45 hover:shadow-[0_0_36px_rgba(251,146,60,0.1)]"
                  )}
                >
                  <CardHeader className="pb-3">
                    <CardTitle>{flow.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-2">
                      {flow.nodes.map((node, index) => (
                        <div key={node} className="flex items-center gap-2">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.045 }}
                            className={cn(
                              "rounded-md border px-3 py-2 font-mono text-[11px] transition",
                              flow.tone === "cyan"
                                ? "border-cyan-300/25 bg-slate-950/70 text-cyan-100 hover:border-cyan-200/60"
                                : "border-orange-300/25 bg-slate-950/70 text-orange-100 hover:border-orange-200/60"
                            )}
                          >
                            {node}
                          </motion.div>
                          {index < flow.nodes.length - 1 && (
                            <ArrowRight
                              className={cn(
                                "size-4",
                                flow.tone === "cyan" ? "text-cyan-200" : "text-orange-200"
                              )}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeCard>
            ))}
          </div>
        </div>
      </SectionShell>

      <section className="relative border-t border-border/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden bg-slate-950/85">
            <AnimatedGrid className="opacity-20" />
            <CardHeader className="relative max-w-4xl p-8">
              <Badge>
                <Rocket className="size-3" />
                Kết luận
              </Badge>
              <CardTitle className="mt-5 text-3xl leading-tight sm:text-4xl">
                Terraform hiện đại hóa triển khai AWS thông qua tự động hóa,
                tính nhất quán, khả năng mở rộng và khả năng quan sát DevOps.
              </CardTitle>
              <CardDescription className="mt-5 text-base leading-7">
                Dự án cho thấy Infrastructure as Code giúp giảm lỗi thủ công,
                làm cho môi trường có thể tái tạo, hỗ trợ mở rộng cloud và kết
                nối tự động hóa triển khai với khả năng quan sát của CloudWatch
                cho mô hình vận hành kiểu production.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Bài trình bày nghiên cứu tự động hóa hạ tầng AWS bằng Terraform</p>
          <div className="flex flex-wrap gap-2">
            {["Terraform", "AWS", "GitHub Actions", "CloudWatch", "IaC"].map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
