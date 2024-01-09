export {};

// electron preload.ts 中定义的方法，用于html与Electron之间的ipc通信
declare global {
    interface Window {
        smartboardAPI: {
            autoSaveContentsToFile: (content: string) => void;
            getContentsFromFile: () => Promise<string>;
        };
    }
}

