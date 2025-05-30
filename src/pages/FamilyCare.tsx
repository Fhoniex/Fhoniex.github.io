import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock数据
const abnormalMetrics = [
  {
    metric: "心率",
    value: 112,
    normalRange: "60-100",
    timestamp: "2025-05-30 10:15"
  },
  {
    metric: "血压",
    value: "158/95",
    normalRange: "<140/90",
    timestamp: "2025-05-30 09:30"
  },
  {
    metric: "血糖",
    value: 9.8,
    normalRange: "3.9-6.1",
    timestamp: "2025-05-29 22:45"
  }
];

const medicalAdvice = [
  {
    title: "立即就医建议",
    content: "患者心率持续偏高，建议立即前往心血管内科就诊，进行心电图和心脏超声检查。",
    urgency: "high"
  },
  {
    title: "近期复查建议",
    content: "血压控制不理想，建议3天内复查血压，如仍高于140/90需调整用药方案。",
    urgency: "medium"
  }
];

const preparationList = [
  { item: "医保卡/身份证", checked: false },
  { item: "既往病历资料", checked: false },
  { item: "当前服用药物清单", checked: false },
  { item: "饮用水和零食", checked: false }
];

export default function FamilyCare() {
  const [list, setList] = useState(preparationList);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCheckItem = (index: number) => {
    const newList = [...list];
    newList[index].checked = !newList[index].checked;
    setList(newList);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      toast.success("数据已更新");
      setIsRefreshing(false);
    }, 1000);
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
        <h1 className="text-3xl font-bold text-[#2CB9B5] mb-6">家庭监护系统</h1>
        
        {/* 异常指标 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-triangle-exclamation mr-2 text-red-500"></i>
            异常指标
          </h2>
          <div className="space-y-4">
            {abnormalMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg bg-red-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{metric.metric}</h3>
                  <span className="text-sm text-gray-500">{metric.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-bold">{metric.value}</span>
                  <span className="text-gray-600">正常范围: {metric.normalRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 就医建议 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-comment-medical mr-2 text-[#2CB9B5]"></i>
            就医建议
          </h2>
          <div className="space-y-4">
            {medicalAdvice.map((advice, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg ${
                  advice.urgency === "high" ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  <i className={`fa-solid ${
                    advice.urgency === "high" ? "fa-circle-exclamation text-red-500" : "fa-clock text-orange-500"
                  } mr-2`}></i>
                  <h3 className="font-medium">{advice.title}</h3>
                </div>
                <p className="text-gray-700">{advice.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 就诊准备清单 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <i className="fa-solid fa-list-check mr-2 text-[#2CB9B5]"></i>
              就诊准备清单
            </h2>
            <button 
              onClick={handleRefresh}
              className="text-[#2CB9B5] hover:text-[#239b97] transition-colors"
              disabled={isRefreshing}
            >
              <i className={`fa-solid fa-rotate-right mr-1 ${isRefreshing ? "animate-spin" : ""}`}></i>
              刷新
            </button>
          </div>
          <div className="space-y-3">
            {list.map((item, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleCheckItem(index)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
                    item.checked ? "bg-[#2CB9B5] border-[#2CB9B5] text-white" : "border-gray-300"
                  }`}>
                    {item.checked && <i className="fa-solid fa-check text-xs"></i>}
                  </div>
                  <span className={item.checked ? "line-through text-gray-400" : ""}>{item.item}</span>
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
