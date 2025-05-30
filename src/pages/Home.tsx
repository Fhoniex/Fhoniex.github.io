import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "健康数据中心",
    description: "混合模式数据采集，支持设备自动同步和人工补充",
    icon: "fa-heart-pulse",
    path: "/health-data"
  },
  {
    title: "智能分析平台",
    description: "综合健康指数计算，多维评估您的健康状况",
    icon: "fa-chart-line",
    path: "/analysis"
  },
  {
    title: "家庭监护系统",
    description: "多级预警推送，实时关注家人健康状态",
    icon: "fa-house-medical",
    path: "/monitoring"
  },
  {
    title: "康复计划中心",
    description: "AI生成的个性化康复方案，医生主导决策",
    icon: "fa-clipboard-check",
    path: "/rehabilitation"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <nav className="bg-[#2CB9B5] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-heartbeat text-2xl"></i>
            <span className="text-xl font-bold">智护医芯</span>
          </div>
          <div className="hidden md:flex space-x-6">
            {features.map((feature) => (
              <Link 
                key={feature.path} 
                to={feature.path}
                className="hover:text-gray-200 transition-colors"
              >
                {feature.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2CB9B5] mb-4">
            您的全方位健康管理平台
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            整合生理监测、心理评估与远程监护功能，通过AI生成医生主导的个性化康复方案
          </p>
        </section>

        {/* 功能卡片 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className={cn(
                "bg-white rounded-lg shadow-md p-6",
                "hover:shadow-lg transition-shadow duration-300",
                "border-t-4 border-[#2CB9B5]"
              )}
            >
              <div className="text-[#2CB9B5] mb-4">
                <i className={`fa-solid ${feature.icon} text-4xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link
                to={feature.path}
                className={cn(
                  "inline-block px-4 py-2 rounded-md",
                  "bg-[#2CB9B5] text-white",
                  "hover:bg-[#239b97] transition-colors"
                )}
              >
                立即体验
              </Link>
            </div>
          ))}
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 智护医芯健康管理平台 版权所有</p>
          <p className="mt-2">
            <i className="fa-solid fa-phone mr-2"></i>
            客服热线: 400-123-4567
          </p>
        </div>
      </footer>
    </div>
  );
}