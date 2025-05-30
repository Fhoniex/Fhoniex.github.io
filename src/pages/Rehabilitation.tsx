import { useState } from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock数据 - 备选方案
const treatmentPlans = [
  {
    id: 1,
    name: "保守治疗",
    effect: 75,
    cost: 30,
    compliance: 85,
    risks: ["恢复周期长", "可能复发"],
    description: "以物理治疗和药物控制为主的保守治疗方案"
  },
  {
    id: 2,
    name: "标准治疗",
    effect: 85,
    cost: 60,
    compliance: 70,
    risks: ["轻微副作用", "需定期复查"],
    description: "结合药物和物理治疗的标准方案"
  },
  {
    id: 3,
    name: "强化治疗",
    effect: 95,
    cost: 90,
    compliance: 50,
    risks: ["明显副作用", "需住院观察"],
    description: "高强度药物和手术结合的强化方案"
  }
];

// 平行坐标图数据格式
const parallelData = treatmentPlans.map(plan => ({
  name: plan.name,
  疗效: plan.effect,
  成本: plan.cost,
  依从性: plan.compliance
}));

export default function Rehabilitation() {
  const [selectedPlan, setSelectedPlan] = useState(treatmentPlans[0]);
  const [dose, setDose] = useState(50);
  const [frequency, setFrequency] = useState(2);
  const [note, setNote] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handlePlanSelect = (plan: typeof treatmentPlans[0]) => {
    setSelectedPlan(plan);
  };

  const handleAddNote = () => {
    if (note.trim()) {
      toast.success("批注已添加");
      setNote("");
      setShowNoteModal(false);
    }
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
        <h1 className="text-3xl font-bold text-[#2CB9B5] mb-6">康复计划中心</h1>
        
        {/* 方案对比与调整区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 方案列表 */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fa-solid fa-list-check mr-2"></i>
              AI预诊方案
            </h2>
            <div className="space-y-3">
              {treatmentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlan.id === plan.id
                      ? "border-[#2CB9B5] bg-[#f0f9f9]"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <h3 className="font-medium text-[#2CB9B5]">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>疗效: {plan.effect}%</span>
                    <span>成本: {plan.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 方案详情与调整 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 平行坐标图 */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-chart-line mr-2"></i>
                  方案对比
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={parallelData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {selectedPlan.id === 1 && (
                        <Bar
                          yAxisId="left"
                          dataKey="疗效"
                          fill="#8884d8"
                          name="疗效"
                        />
                      )}
                      {selectedPlan.id === 2 && (
                        <Bar
                          yAxisId="left"
                          dataKey="疗效"
                          fill="#82ca9d"
                          name="疗效"
                        />
                      )}
                      {selectedPlan.id === 3 && (
                        <Bar
                          yAxisId="left"
                          dataKey="疗效"
                          fill="#ffc658"
                          name="疗效"
                        />
                      )}
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="成本"
                        stroke="#ff8042"
                        name="成本"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="依从性"
                        stroke="#00C49F"
                        name="依从性"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 方案详情 */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-file-lines mr-2"></i>
                  方案详情
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-[#2CB9B5]">{selectedPlan.name}</h3>
                    <p className="text-gray-700 mt-1">{selectedPlan.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">预期效果</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-[#2CB9B5] h-2.5 rounded-full"
                        style={{ width: `${selectedPlan.effect}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{selectedPlan.effect}%</span>
                  </div>
                  <div>
                    <h4 className="font-medium">潜在风险</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {selectedPlan.risks.map((risk, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 医生调整 */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-user-doctor mr-2"></i>
                  医生调整
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2">
                      药物剂量: <span className="font-medium">{dose}mg</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={dose}
                      onChange={(e) => setDose(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      用药频次: <span className="font-medium">{frequency}次/天</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={frequency}
                      onChange={(e) => setFrequency(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => setShowNoteModal(true)}
                      className="bg-[#2CB9B5] text-white px-4 py-2 rounded-md hover:bg-[#239b97] transition-colors"
                    >
                      <i className="fa-solid fa-note-sticky mr-2"></i>
                      添加批注
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 批注模态框 */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">添加医生批注</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-md p-3 mb-4"
              rows={4}
              placeholder="请输入批注内容..."
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-[#2CB9B5] text-white rounded-md hover:bg-[#239b97] transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

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
