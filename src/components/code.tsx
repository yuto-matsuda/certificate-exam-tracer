'use client';
import { useState, useEffect, useContext, createContext} from 'react';
import parseHTML from '../utils/parse-html';
import textCopy from '../utils/text-copy';
import styles from '../styles/code.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
    faFileCode,
    faXmark,
    faBarsStaggered,
    faEllipsis,
    faArrowsLeftRightToLine,
    faCopy,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { faReact, faSass } from '@fortawesome/free-brands-svg-icons';


type TabKey = string | number;

type TabContextType = {
    activeTabKey: TabKey
    setActiveTabKey: React.Dispatch<React.SetStateAction<TabKey>>
    visibleLineNum: boolean
    setVisibleLineNum: React.Dispatch<React.SetStateAction<boolean>>
    cpText: string
    setCpText: React.Dispatch<React.SetStateAction<string>>
}

const TabContext = createContext<TabContextType>({
    activeTabKey: '',
    setActiveTabKey: () => {},
    visibleLineNum: true,
    setVisibleLineNum: () => {},
    cpText: '',
    setCpText: () => {}
});

export function Code({
    title,
    defaultKey = 1,
    children
}: {
    title: string
    defaultKey?: TabKey
    children: React.ReactNode
}) {
    const [activeTabKey, setActiveTabKey] = useState<TabKey>(defaultKey);
    const [visibleLineNum, setVisibleLineNum] = useState<boolean>(true);
    const [cpText, setCpText] = useState<string>('');

    return (
        <TabContext.Provider
            value={{ 
                activeTabKey,
                setActiveTabKey,
                visibleLineNum,
                setVisibleLineNum,
                cpText,
                setCpText
            }}
        >
            <div className={styles.wrapper}>
                <h5 className={styles.title}>
                    <div>
                        <FontAwesomeIcon icon={faFileCode} className={styles.icon} />
                        {title}
                    </div>
                </h5>
                {children}
            </div>
        </TabContext.Provider>
    );
}

export function CodeTabField({
    children
}: {
    children: React.ReactNode
}) {
    const [isOpenOpts, setIsOpenOpts] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const { visibleLineNum, setVisibleLineNum } = useContext(TabContext);
    const { cpText } = useContext(TabContext);

    const toggleOpenOpts = () => {
        setIsOpenOpts((prev) => !prev);
    }

    const toggleLineNum = () => {
        setVisibleLineNum((prev) => !prev);
    }

    const copy = () => {
        textCopy(cpText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }

    return(
        <>
            <div className={styles.tabField}>
                <ul className={styles.tabs}>
                    {children}
                </ul>
                <button className={styles.optionBtn} onClick={toggleOpenOpts}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>
            <div className={`${styles.optionList} ${isOpenOpts ? styles.open : styles.close}`}>
                <button className={styles.lineToggleBtn} onClick={toggleLineNum}>
                    <FontAwesomeIcon icon={faArrowsLeftRightToLine} className={styles.icon} />
                    {visibleLineNum ? '行番号を非表示　' : '行番号を表示　　'}
                </button>
                <button className={styles.copyBtn} onClick={() => copy()}>
                    {isCopied ? (
                        <>
                            <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                            Copied!
                        </>
                    ): (
                        <>
                            <FontAwesomeIcon icon={faCopy} className={styles.icon} />
                            コピーする
                        </>
                    )}
                </button>
            </div>
        </>
    );
}

export function CodeTab({
    tabKey,
    fileName,
    format,
}: {
    tabKey: TabKey
    fileName: string
    format: string
}) {
    const { activeTabKey, setActiveTabKey } = useContext(TabContext);
    const isActive = activeTabKey == tabKey;
    let fileIcon: IconDefinition | null;
    let fileStyle: string;

    const switchTab = () => {
        setActiveTabKey(tabKey);
    }

    if (format === 'c') {
        fileIcon = null;
        fileStyle = styles.cLangIcon;
    } else if (format === 'js') {
        fileIcon = null;
        fileStyle = styles.jsLangIcon;
    } else if (format === 'ts') {
        fileIcon = null;
        fileStyle = styles.tsLangIcon;
    } else if (format === 'tsx') {
        fileIcon = faReact;
        fileStyle = styles.reactIcon;
    } else if (format === 'html') {
        fileIcon = null;
        fileStyle = styles.htmlLangIcon;
    } else if (format === 'scss') {
        fileIcon = faSass;
        fileStyle = styles.scssIcon;
    } else {
        fileIcon = faBarsStaggered;
        fileStyle = styles.exeIcon;
    }

    return (
        <li className={`${styles.tab} ${isActive && styles.activeTab}`} onClick={switchTab}>
            {fileIcon ? (
                <FontAwesomeIcon icon={fileIcon} className={fileStyle} />
            ) : (
                <span className={fileStyle}></span>
            )}
            {fileName}
            {isActive && (
                <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} />
            )}
        </li>
    );
}

export function CodeSource({
    tabKey = 'tab-none',
    highlightedString
}: {
    tabKey?: TabKey
    highlightedString: string
}) {
    const { activeTabKey, visibleLineNum, setCpText } = useContext(TabContext);
    const isActive = (activeTabKey == tabKey || tabKey === 'tab-none');
    const codeHTML = parseHTML(highlightedString);
    const lineNumCnt = (highlightedString.match(/\n/g) || []).length + 1;

    // Codeコンポーネントのレンダリング中にCodeコンポーネントを更新しないようにする
    useEffect(() => {
        if (isActive) {
            // タグの削除・エスケープ文字の変換
            setCpText(
                highlightedString
                .replace(/(<([^>]+)>)/gi, '')
                .replace(/&lt;/g,   '<')
                .replace(/&gt;/g,   '>')
                .replace(/&#036;/g, '$')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g,  "'")
                .replace(/&#096;/g, "`")
            );
        }
    }, [isActive, highlightedString, setCpText]);

    return (
        <pre className={`${styles.src} ${isActive && styles.activeSrc}`}>
            {visibleLineNum && <code className={styles.lineNum}>{[...Array(lineNumCnt)].map((_, i) => <span key={i}>{i + 1}.</span>)}</code>}
            <code>{codeHTML}</code>
        </pre>
    );
}