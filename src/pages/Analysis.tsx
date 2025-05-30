import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock数据
const healthScore = {
  physical: 82,
  behavior: 76,
  mental: 68,
  overall: 76
};

const warnings = [
  {
    level: "yellow",
    message: "心理指数偏低",
    suggestion: "建议增加社交活动，保持规律作息"
  },
  {
    level: "red",
    message: "行为指数异常下降",
    suggestion: "请及时就医检查，建议家人陪同"
  }
];

const ageRanges = [
  {
    ageRange: "18-30岁",
    physicalBase: 85,
    behaviorBase: 80,
    mentalBase: 75
  },
  {
    ageRange: "31-45岁",
    physicalBase: 80,
    behaviorBase: 75,
    mentalBase: 70
  },
  {
    ageRange: "46-60岁",
    physicalBase: 75,
    behaviorBase: 70,
    mentalBase: 65
  },
  {
    ageRange: "60岁以上",
    physicalBase: 70,
    behaviorBase: 65,
    mentalBase: 60
  }
];

export default function Analysis() {
  const [selectedAgeRange, setSelectedAgeRange] = useState(ageRanges[0]);

  // 准备雷达图数据
  const radarData = [
    { subject: '生理', A: healthScore.physical, fullMark: 100 },
    { subject: '行为', A: healthScore.behavior, fullMark: 100 },
    { subject: '心理', A: healthScore.mental, fullMark: 100 }
  ];

  const handleShowSuggestion = (suggestion: string) => {
    toast.info(suggestion, { duration: 5000 });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 - 与首页一致 */}
      <nav className="bg-[#2CB9B5] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-heartbeat text-2xl"></i>
            <span className="text-xl font-bold">智护医芯</span>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#2CB9B5] mb-6">智能分析平台</h1>
        
        {/* 健康指数总览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium mb-2">综合健康指数</h3>
            <div className="text-4xl font-bold text-[#2CB9B5]">{healthScore.overall}</div>
            <div className="text-sm text-gray-500 mt-2">(满分100)</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium mb-2">生理指数</h3>
            <div className="text-4xl font-bold text-[#2CB9B5]">{healthScore.physical}</div>
            <div className="text-sm text-gray-500 mt-2">权重40%</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium mb-2">行为指数</h3>
            <div className="text-4xl font-bold text-[#2CB9B5]">{healthScore.behavior}</div>
            <div className="text-sm text-gray-500 mt-2">权重35%</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium mb-2">心理指数</h3>
            <div className="text-4xl font-bold text-[#2CB9B5]">{healthScore.mental}</div>
            <div className="text-sm text-gray-500 mt-2">权重25%</div>
          </div>
        </div>

        {/* 年龄选择 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-user-clock mr-2"></i>
            年龄基准调整
          </h2>
          <div className="flex items-center">
            <label htmlFor="age-range" className="mr-4">选择年龄段:</label>
            <select
              id="age-range"
              value={selectedAgeRange.ageRange}
              onChange={(e) => {
                const selected = ageRanges.find(range => range.ageRange === e.target.value);
                if (selected) setSelectedAgeRange(selected);
              }}
              className="border rounded-md px-4 py-2"
            >
              {ageRanges.map((range) => (
                <option key={range.ageRange} value={range.ageRange}>{range.ageRange}</option>
              ))}
            </select>
            <div className="ml-6">
              <span className="text-gray-600 mr-2">当前基准:</span>
              <span className="font-medium">生理{selectedAgeRange.physicalBase} | 行为{selectedAgeRange.behaviorBase} | 心理{selectedAgeRange.mentalBase}</span>
            </div>
          </div>
        </div>

        {/* 雷达图 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-chart-radar mr-2"></i>
            健康维度分析
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="健康指数" 
                  dataKey="A" 
                  stroke="#2CB9B5" 
                  fill="#2CB9B5" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 预警系统 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
            健康预警
          </h2>
          <div className="space-y-3">
            {warnings.map((warning, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg cursor-pointer ${
                  warning.level === 'red' 
                    ? 'bg-red-50 border-l-4 border-red-500' 
                    : 'bg-yellow-50 border-l-4 border-yellow-500'
                }`}
                onClick={() => handleShowSuggestion(warning.suggestion)}
              >
                <div className="flex items-center">
                  <i className={`fa-solid fa-circle-exclamation mr-3 ${
                    warning.level === 'red' ? 'text-red-500' : 'text-yellow-500'
                  }`}></i>
                  <div>
                    <h3 className="font-medium">{warning.message}</h3>
                    <p className="text-sm text-gray-600 mt-1">点击查看建议</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 - 与首页一致 */}
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
