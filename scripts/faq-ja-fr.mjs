/**
 * Builds ja/fr FAQ modules from the pt-br block (structure) with native copy.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const faqFull = fs.readFileSync(path.join(root, 'src/i18n/faq-full.ts'), 'utf8');
const ptMatch = faqFull.match(/'pt-br': \{([\s\S]*?)\n  \},\s*\n\s*th:/);
if (!ptMatch) throw new Error('pt-br block not found');

const keys = [...ptMatch[1].matchAll(/'([^']+)':\s*\{\s*q:/g)].map((m) => m[1]);

const JA = {
  status: {
    q: 'Aion 2 チートがオンラインかどうかはどこで確認できますか？',
    a: 'buyaion2cheats.net のライブステータスバナーと Discord #status で確認してください。Aion 2 やアンチチート更新後は必ず再確認してください。',
  },
  'after-buy': {
    q: '購入後に何が解放されますか？',
    a: 'ポータルでローダー、セットアップガイド、設定ライブラリが使えます。Aion 2 を起動する前にガイドに従ってください。',
  },
  'ban-risk': {
    q: 'プライベート Aion 2 チートで BAN されますか？',
    a: 'はい。あらゆる改変にはリスクがあります。アンチチートと報告システムは変化し続けます。現在のステータスを読み、リスクを理解してから使ってください。',
  },
  platforms: {
    q: '対応プラットフォームは？',
    a: 'Windows 10/11 64 ビットと公式ランチャーの Aion 2 のみ。macOS と Linux は非対応です。',
  },
  'license-move': {
    q: '新しい PC にライセンスを移せますか？',
    a: 'はい。ポータルの HWID リセットまたは Discord チケットで可能です。上限はプランによります。',
  },
  'products-page': {
    q: '製品とユーティリティはどこにありますか？',
    a: 'Aion 2 製品ページにチートプラン、HWID スプーファー、UGC、コスチュームチェンジャーと機能一覧・チェックアウトがあります。',
  },
  'what-is-esp': {
    q: 'Aion 2 ESP ウォールハック / ESP とは？',
    a: 'ESP ウォールハックとプレイヤー ESP は深淵の地形越しに敵位置、ドロップ、ルート、キャンプを表示します。Lite は情報オーバーレイ、Pro・Elite はスクリプトモジュールを追加します。',
  },
  'esp-vs-scripts': {
    q: 'ESP ウォールハックとエイムボットの違いは？',
    a: 'ESP は情報オーバーレイでスキルを自動発動しません。エイムボット、Smooth Aim、Sticky Aim は Pro・Elite の照準補助です。Lite は認識のみです。',
  },
  'which-tier-esp': {
    q: 'ESP ウォールハックだけならどのプラン？',
    a: 'Lite は認識専用：プレイヤー ESP、ドロップ、ルートタイマー、レーダー。Pro はエイムボット、Elite はボット・キルスティール・コスチュームチェンジャーまで。',
  },
  'which-tier-scripts': {
    q: 'エイムボットが含まれるプランは？',
    a: 'Pro に Aimbot、Smooth Aim、Sticky Aim、ホットキーマクロ。Elite は Pro 全部にファームアシストと Auto Kill。Lite にはスキル自動化はありません。',
  },
  'rank-lite-vs-pro': {
    q: 'Lite・Pro・Elite の選び方は？',
    a: 'マップ認識だけ → Lite。深淵でエイムボット → Pro。フルボットと優先パッチ → Elite。各ページまたは FAQ で比較できます。',
  },
  'elite-slots': {
    q: 'Elite の枠が限られる理由は？',
    a: 'Elite は開発者直接サポートと優先パッチのプライベートビルドです。枠制限でパッチサイクルを速く保ちます。購入前にステータスバナーを確認してください。',
  },
  'stream-proof': {
    q: 'OBS はオーバーレイを録画しますか？',
    a: 'Lite・Pro・Elite のストリームプルーフは OBS と Discord 共有からオーバーレイを隠します。配信前にローカル録画でテストしてください。',
  },
  undetected: {
    q: '未検知 Aion 2 チートは保証されますか？',
    a: 'いいえ。未検知は製品ページの現在ステータスであり永久保証ではありません。更新中・テスト中・検知時はすぐ停止してください。',
  },
  'esp-safer': {
    q: 'ESP ウォールハックはエイムボットより安全ですか？',
    a: 'リプレイではボットより目立ちにくいことがありますが、依然チートです。エイムボットを切ってもアンチチートがオーバーレイを無視しません。',
  },
  'hwid-when': {
    q: 'HWID スプーファーはいつ必要ですか？',
    a: '新しい NCSOFT アカウントがその PC だけ即失敗し、別 PC では動くとき—ハードウェア制限です。アカウントのみの場合は UGC をご覧ください。',
  },
  'ugc-what': {
    q: 'UGC とは？',
    a: 'UGC（Unban & Governance Control）は NCSOFT 制限とアンチチート BAN の申立ワークスペースです。ワークフローと追跡であり、解除保証はありません。',
  },
  'skin-changer': {
    q: 'コスチュームチェンジャーは衣装を変えますか？',
    a: 'ローカルクライアントでのプレビューのみです。他プレイヤーは本当のインベントリを見ます。Elite に含まれ、単体購入も可能です。',
  },
  'external-loader': {
    q: 'ローダーは NCSOFT フォルダに注入しますか？',
    a: 'Aion 2 Cheats は外部方式とクラウド設定同期で、Aion 2 フォルダにファイルを注入しません。アンチチートリスクは残ります。',
  },
  'blog-vs-cheats': {
    q: 'ブログのチートコードは深淵チートと同じですか？',
    a: 'いいえ。ブログの NCSOFT コンソールコマンドはチート有効のカスタムロビーのみです。深淵用チートは別製品です。',
  },
  'blog-setup': {
    q: 'ブログのセットアップガイドの購入先は？',
    a: 'ガイドはプランページと製品ハブにリンクします。チェックアウトは安全なパートナー経由—知らない Discord DM のローダーは使わないでください。',
  },
  'compare-plans': {
    q: 'プランを並べて比較するには？',
    a: '各チートページに比較表があります。FAQ に製品・チート・ブログの回答をまとめています。',
  },
  'who-lite': {
    q: 'Lite が向いている人は？',
    a: 'ESP・ドロップ・ルートだけ欲しくスキル自動化を使わない人。コンボエイムボットを常時使うなら Pro を。',
  },
  'who-pro': {
    q: 'Pro を買うべき人は？',
    a: 'ESP ウォールハックと Aimbot、Smooth Aim、ホットキーマクロが欲しい深淵プレイヤー。buyaion2cheats.net で最も人気のプランです。',
  },
  'who-elite': {
    q: 'Elite を買うべき人は？',
    a: 'ファームアシスト、Auto Kill、コスチュームチェンジャー、優先パッチが必要で枠が空いているヘビーユーザー向けです。',
  },
  'eac-update': {
    q: 'アンチチート更新後は？',
    a: 'buyaion2cheats.net と Discord #status を確認。バナーがオンラインになるまで起動しないでください。パッチ後は保守的プリセットを。',
  },
  'discord-help': {
    q: 'インストールのサポートは？',
    a: '購入後 Discord で注文メール、Windows 版、Aion 2 クライアントビルドを伝えてください。スタッフがローダー設定を案内します。',
  },
  'zero-build-ranked': {
    q: 'インスタンスと深淵 PvP で使えますか？',
    a: 'はい。Lite・Pro・Elite にインスタンスと深淵プリセットがあります。初キュー前に距離上限とスクリプト遅延を調整してください。',
  },
  'zoom-hack': {
    q: 'レーダーハックはどのプラン？',
    a: 'レーダーは Lite から Pro・Elite まで含まれます。ミニレーダーでゾーン把握がしやすくなります。',
  },
  'auto-farm': {
    q: 'ファームアシストはどのプラン？',
    a: 'ファームアシスト、Flight Assist AI、自動ロードアウトは Elite 専用。Pro は戦闘エイムボットのみでボットファームはありません。',
  },
  'private-cheats': {
    q: 'プライベート Aion 2 チートとは？',
    a: 'ユーザーごとのキーと保守されたビルドであり、公開 zip パックではありません。Aion 2 Cheats はポータルで ESP・エイムボット・ウォールハックを提供します。',
  },
};

const FR = {
  status: {
    q: 'Où voir si les cheats Aion 2 sont en ligne ?',
    a: 'Bannière en direct sur buyaion2cheats.net et Discord #status. Revérifiez après chaque mise à jour d’Aion 2 ou de l’anticheat.',
  },
  'after-buy': {
    q: 'Que débloque l’achat ?',
    a: 'Le portail active le loader, le guide d’installation et la bibliothèque de configs. Suivez le guide avant de lancer Aion 2.',
  },
  'ban-risk': {
    q: 'Puis-je être banni avec des cheats privés Aion 2 ?',
    a: 'Oui — toute modification comporte un risque. L’anticheat et les signalements évoluent. Lisez le statut actuel et acceptez le risque.',
  },
  platforms: {
    q: 'Quelles plateformes sont prises en charge ?',
    a: 'Uniquement Windows 10/11 64 bits avec le lanceur officiel Aion 2. Pas de macOS ni Linux.',
  },
  'license-move': {
    q: 'Puis-je transférer la licence sur un nouveau PC ?',
    a: 'Oui — reset HWID dans le portail ou ticket Discord. Les limites dépendent de l’offre.',
  },
  'products-page': {
    q: 'Où sont les produits et utilitaires ?',
    a: 'Sur la page produits Aion 2 : offres de cheats, spoofer HWID, UGC et changeur de costumes, avec listes de fonctions et checkout.',
  },
  'what-is-esp': {
    q: 'Qu’est-ce que l’ESP wallhack / ESP Aion 2 ?',
    a: 'L’ESP wallhack et l’ESP joueur affichent positions ennemies, drops, loot et camps à travers l’Abîme. Lite = overlay d’info ; Pro et Elite ajoutent des modules de script.',
  },
  'esp-vs-scripts': {
    q: 'Différence entre ESP wallhack et aimbot ?',
    a: 'ESP wallhack/ESP sont des overlays d’information — pas de lancement de skills. Aimbot, Smooth Aim et Sticky Aim sont sur Pro et Elite. Lite reste en perception seule.',
  },
  'which-tier-esp': {
    q: 'Quelle offre pour l’ESP wallhack seul ?',
    a: 'Lite : perception seule — ESP joueur, drops, timers de loot et radar. Pro ajoute l’aimbot ; Elite ajoute bots, kill steal et changeur de costumes.',
  },
  'which-tier-scripts': {
    q: 'Quelle offre inclut l’aimbot ?',
    a: 'Pro : Aimbot, Smooth Aim, Sticky Aim et macros. Elite inclut tout Pro plus farm assist et Auto Kill. Lite n’a pas d’automatisation de skills.',
  },
  'rank-lite-vs-pro': {
    q: 'Comment choisir Lite, Pro ou Elite ?',
    a: 'Carte seule → Lite. Abîme avec aimbot → Pro. Suite complète de bots et patches prioritaires → Elite. Comparez sur les pages ou la FAQ.',
  },
  'elite-slots': {
    q: 'Pourquoi les places Elite sont limitées ?',
    a: 'Elite est un build privé avec support dev direct et patches prioritaires. Le quota garde des cycles de patch rapides. Vérifiez le bandeau avant l’achat.',
  },
  'stream-proof': {
    q: 'OBS capture-t-il mon overlay ?',
    a: 'Le mode stream-proof sur Lite, Pro et Elite masque les overlays pour OBS et le partage Discord. Testez un enregistrement local avant de streamer.',
  },
  undetected: {
    q: 'Les cheats undetected Aion 2 sont-ils garantis ?',
    a: 'Non. Undetected est le statut actuel sur la page produit — pas une garantie permanente. Arrêtez si le build indique mise à jour, test ou détecté.',
  },
  'esp-safer': {
    q: 'L’ESP wallhack est-il plus sûr que l’aimbot ?',
    a: 'L’ESP peut paraître plus discret en replay que des patterns de bot, mais reste un cheat. L’anticheat n’ignore pas les overlays quand l’aimbot est off.',
  },
  'hwid-when': {
    q: 'Quand faut-il le spoofer HWID ?',
    a: 'Quand des comptes NCSOFT frais échouent tout de suite sur un PC mais pas sur un autre — blocage matériel. Pour un cas compte seul, voir UGC.',
  },
  'ugc-what': {
    q: 'Qu’est-ce que l’UGC ?',
    a: 'UGC (Unban & Governance Control) est un espace d’appel pour restrictions NCSOFT et bans anticheat — workflows et suivi, sans garantie de déban.',
  },
  'skin-changer': {
    q: 'Le changeur de costumes modifie mon inventaire ?',
    a: 'Prévisualisation locale uniquement. Les autres joueurs voient votre vrai inventaire. Inclus dans Elite ; aussi vendu seul pour preview.',
  },
  'external-loader': {
    q: 'Le loader injecte-t-il dans le dossier NCSOFT ?',
    a: 'Aion 2 Cheats tourne en externe avec sync cloud — pas d’injection dans le dossier Aion 2. Le risque anticheat reste.',
  },
  'blog-vs-cheats': {
    q: 'Les codes du blog sont-ils les cheats de l’Abîme ?',
    a: 'Non. Les commandes console NCSOFT du blog valent seulement en lobby custom avec cheats. Les cheats Abîme sont des produits séparés.',
  },
  'blog-setup': {
    q: 'Où mènent les guides d’installation du blog ?',
    a: 'Vers les pages d’offre et le hub produits. Checkout via partenaire sécurisé — jamais de loader depuis un DM Discord inconnu.',
  },
  'compare-plans': {
    q: 'Où comparer les offres côte à côte ?',
    a: 'Chaque page d’offre a un tableau comparatif. La FAQ regroupe produit, cheat et blog.',
  },
  'who-lite': {
    q: 'Qui doit rester sur Lite ?',
    a: 'Ceux qui veulent seulement la perception carte — ESP, drops, loot — sans automatisation. Si vous spammez l’aimbot combo, prenez Pro.',
  },
  'who-pro': {
    q: 'Qui doit acheter Pro ?',
    a: 'Joueurs Abîme voulant Aimbot, Smooth Aim et macros avec ESP wallhack. Offre la plus populaire sur buyaion2cheats.net.',
  },
  'who-elite': {
    q: 'Qui doit acheter Elite ?',
    a: 'Ceux qui veulent farm assist, Auto Kill, changeur de costumes et patches prioritaires quand des places sont ouvertes.',
  },
  'eac-update': {
    q: 'Après une mise à jour anticheat ?',
    a: 'Statut sur buyaion2cheats.net et Discord #status. Ne lancez pas tant que le bandeau n’est pas online. Presets conservateurs après patch.',
  },
  'discord-help': {
    q: 'Comment obtenir de l’aide à l’installation ?',
    a: 'Après achat, sur Discord : e-mail de commande, version Windows et build client Aion 2. L’équipe guide la config du loader.',
  },
  'zero-build-ranked': {
    q: 'Les offres fonctionnent en instances et PvP Abîme ?',
    a: 'Oui — Lite, Pro et Elite ont des presets instance et Abîme dans le portail. Réglez caps de distance et délais avant la première file.',
  },
  'zoom-hack': {
    q: 'Quelle offre inclut le radar hack ?',
    a: 'Le radar est inclus dès Lite jusqu’à Pro et Elite. Le mini-radar aide la perception de zone.',
  },
  'auto-farm': {
    q: 'Quelle offre inclut le farm assist ?',
    a: 'Farm assist, Flight Assist AI et gestionnaire de loadout auto sont Elite uniquement. Pro couvre l’aimbot combat sans bot farm.',
  },
  'private-cheats': {
    q: 'Que sont les cheats privés Aion 2 ?',
    a: 'Clés par utilisateur et builds maintenus — pas de packs zip publics. Aion 2 Cheats livre ESP, aimbot et wallhack via le portail.',
  },
};

for (const [locale, data] of [['ja', JA], ['fr', FR]]) {
  const missing = keys.filter((k) => !data[k]);
  if (missing.length) console.warn(locale, 'missing keys', missing);
}

const outDir = path.join(root, 'src/i18n/faq/locales');
fs.mkdirSync(outDir, { recursive: true });

function writeLocale(exportName, locale, data) {
  const body = JSON.stringify(data, null, 2);
  fs.writeFileSync(
    path.join(outDir, `${locale}.ts`),
    `import type { FaqCopy } from '../types';

export const ${exportName}: Record<string, FaqCopy> = ${body};
`,
    'utf8',
  );
}

fs.writeFileSync(
  path.join(outDir, 'types.ts'),
  `export type FaqCopy = { q: string; a: string };\n`,
  'utf8',
);

writeLocale('FAQ_JA', 'ja', JA);
writeLocale('FAQ_FR', 'fr', FR);

if (!faqFull.includes('FAQ_JA')) {
  let s = faqFull.replace(
    "import type { SiteFaqItem } from '../data/faq';",
    `import type { SiteFaqItem } from '../data/faq';
import { FAQ_JA } from './faq/locales/ja';
import { FAQ_FR } from './faq/locales/fr';`,
  );
  s = s.replace(
    "\n  th: {",
    `\n  ja: FAQ_JA,\n  fr: FAQ_FR,\n  th: {`,
  );
  fs.writeFileSync(path.join(root, 'src/i18n/faq-full.ts'), s, 'utf8');
  console.log('Updated faq-full.ts');
}

console.log('FAQ ja/fr modules written');
