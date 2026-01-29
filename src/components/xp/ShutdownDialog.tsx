import { Power, RotateCcw, XCircle } from 'lucide-react';
import { useWindowManager } from '../../context/WindowManager';

export const ShutdownDialog = () => {
    const { closeShutdownModal, shutdown, restart } = useWindowManager();

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <div className="w-[300px] bg-[#003399] border-2 border-[#ffffff] rounded-lg shadow-2xl overflow-hidden font-sans">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0033CC] to-[#4281F4] px-3 py-1.5 flex justify-between items-center border-b border-[#002266]">
                    <span className="text-white text-sm font-bold drop-shadow-sm">Shut Down Windows</span>
                    <button
                        onClick={closeShutdownModal}
                        className="w-5 h-5 bg-[#C0C0C0] border border-[#ffffff] rounded-sm flex items-center justify-center hover:bg-[#ff4d4d] transition-colors group"
                    >
                        <XCircle size={14} className="text-blue-900 group-hover:text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="bg-[#5A7EDC] p-6 flex flex-col items-center gap-6">
                    <div className="flex justify-around w-full max-w-[200px]">
                        {/* Shut Down */}
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={shutdown}
                                className="w-12 h-12 bg-red-600 rounded-lg border-2 border-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                            >
                                <Power size={24} className="text-white" />
                            </button>
                            <span className="text-white text-xs font-bold">Shut Down</span>
                        </div>

                        {/* Restart */}
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={restart}
                                className="w-12 h-12 bg-green-600 rounded-lg border-2 border-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                            >
                                <RotateCcw size={24} className="text-white" />
                            </button>
                            <span className="text-white text-xs font-bold">Restart</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#5A7EDC] px-4 py-3 flex justify-end gap-2 border-t border-white/20">
                    <button
                        onClick={closeShutdownModal}
                        className="px-6 py-1 bg-white text-black text-xs font-medium border border-black/40 rounded-sm hover:bg-gray-100 active:bg-gray-200 shadow-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Background darkening effect for the rest of the desktop */}
            <div className="fixed inset-0 -z-10 bg-black/20 pointer-events-none" />
        </div>
    );
};
