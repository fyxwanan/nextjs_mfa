import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';

interface MFAData {
    email: string;
    secret: string;
    createAt: string;
    updateAt: string;
}

const getFilePath = () => {
    const dir = path.join(process.cwd(), 'app', 'lib', 'database', 'mfa');
    return {
        dir,
        filePath: path.join(dir, 'data.txt')
    };
};

const ensureDirectoryExists = async (dir: string) => {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
};

const readData = async (filePath: string): Promise<MFAData[]> => {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        return [];
    }
};

export const saveSecret = async (email: string, secret: string) => {
    const { dir, filePath } = getFilePath();
    await ensureDirectoryExists(dir);

    const data = await readData(filePath);
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const existingIndex = data.findIndex(item => item.email === email);

    if (existingIndex > -1) {
        data[existingIndex] = {
            ...data[existingIndex],
            secret,
            updateAt: now
        };
    } else {
        data.push({
            email,
            secret,
            createAt: now,
            updateAt: now
        });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getSecret = async (email: string) => {
    const { filePath } = getFilePath();
    const data = await readData(filePath);
    const item = data.find(i => i.email === email);
    return item ? item.secret : null;
};
