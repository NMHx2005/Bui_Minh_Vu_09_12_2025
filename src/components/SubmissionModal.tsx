import { CloseOutlined, PaperClipOutlined, CloudUploadOutlined, DownOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Select, Input } from 'antd'

type Props = {
    visible: boolean
    onClose: () => void
    onSubmit: (data: { repository: string; branch: string; file: string }) => void
}

export function SubmissionModal({ visible, onClose, onSubmit }: Props) {
    const [repository, setRepository] = useState('')
    const [branch, setBranch] = useState('')
    const [file, setFile] = useState('')

    if (!visible) return null

    const handleSubmit = () => {
        if (repository && branch && file) {
            onSubmit({ repository, branch, file })
            // Reset form
            setRepository('')
            setBranch('')
            setFile('')
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-[90%] max-w-[640px] h-auto min-h-[450px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-scaleIn p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-6 pb-4 border-b border-[#DDDDDD]">
                    <h2 className="text-2xl font-semibold text-black">Nộp bài</h2>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center text-[#3d3d3d] hover:text-[#f4762d] transition-colors duration-200"
                    aria-label="Đóng"
                >
                    <CloseOutlined className="text-lg" />
                </button>

                {/* Form Fields */}
                <div className="flex-1 space-y-6">
                    {/* Repository Input */}
                    <div className="space-y-1.5">
                        <label className="text-base font-normal text-black">Repository</label>
                        <Select
                            value={repository}
                            onChange={setRepository}
                            placeholder="Chọn repository"
                            suffixIcon={<DownOutlined />}
                            className="w-full"
                            size="large"
                            style={{
                                height: '44px',
                            }}
                            popupClassName="submission-select-dropdown"
                        >
                            <Select.Option value="repo1">Repository 1</Select.Option>
                            <Select.Option value="repo2">Repository 2</Select.Option>
                            <Select.Option value="repo3">Repository 3</Select.Option>
                        </Select>
                    </div>

                    {/* Branch Input */}
                    <div className="space-y-1.5">
                        <label className="text-base font-normal text-black">Branch</label>
                        <Select
                            value={branch}
                            onChange={setBranch}
                            placeholder="Chọn branch"
                            suffixIcon={<DownOutlined />}
                            className="w-full"
                            size="large"
                            style={{
                                height: '44px',
                            }}
                        >
                            <Select.Option value="main">main</Select.Option>
                            <Select.Option value="develop">develop</Select.Option>
                            <Select.Option value="feature">feature</Select.Option>
                        </Select>
                    </div>

                    {/* File Upload Input */}
                    <div className="space-y-1.5">
                        <label className="text-base font-normal text-black">File đính kèm</label>
                        <div className="relative">
                            <Input
                                value={file}
                                onChange={(e) => setFile(e.target.value)}
                                placeholder="Chọn file đính kèm"
                                prefix={<PaperClipOutlined className="text-[#3d3d3d]" />}
                                suffix={<DownOutlined className="text-[#3d3d3d]" />}
                                className="w-full"
                                size="large"
                                style={{
                                    height: '44px',
                                    backgroundColor: '#fff',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 h-12 rounded-lg bg-[#F4F4F4] text-[#3d3d3d] font-medium hover:bg-[#E5E5E5] transition-colors duration-200"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 h-12 rounded-lg bg-[#DD673C] text-white font-medium hover:bg-[#C85A2F] transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <CloudUploadOutlined />
                        <span>Nộp bài</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

