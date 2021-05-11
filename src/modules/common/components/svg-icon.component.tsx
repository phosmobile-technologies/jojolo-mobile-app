import React from "react";
import { SvgXml } from "react-native-svg";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

/**
 * SVG Icon component
 *
 * @param iconName The name of the icon
 * @returns
 */
const SvgIcon = ({
  iconName,
  color,
  style,
}: {
  iconName: string;
  color?: string;
  style?: object;
}) => {
  let Icon;
  let iconXml: string;

  if (!color) {
    color = COLORS.GRAY_TEXT_COLOR;
  }

  if (!style) {
    style = {};
  }

  switch (iconName) {
    case SVG_ICONS.FORUM_ICON:
      iconXml = FORUM_ICON;
      break;

    case SVG_ICONS.PRIVATE_CHAT_ICON:
      iconXml = PRIVATE_CHAT_ICON;
      break;

    case SVG_ICONS.ACCOUNT_ICON:
      iconXml = ACCOUNT_ICON;
      break;

    case SVG_ICONS.SEARCH_ICON:
      iconXml = SEARCH_ICON;
      break;

    case SVG_ICONS.FUNNEL_ICON:
      iconXml = FUNNEL_ICON;
      break;

    case SVG_ICONS.NOTIFICATION_ICON:
      iconXml = NOTIFICATION_ICON;
      break;

    case SVG_ICONS.GOLD_BADGE_ICON:
      iconXml = GOLD_BADGE_ICON;
      break;

    case SVG_ICONS.GOLD_STAR_ICON:
      iconXml = GOLD_STAR_ICON;
      break;

    case SVG_ICONS.THREE_DOTS_ICON:
      iconXml = THREE_DOTS_ICON;
      break;

    case SVG_ICONS.TAG_ICON:
      iconXml = TAG_ICON;
      break;

    case SVG_ICONS.LIKE_ICON:
      iconXml = LIKE_ICON;
      break;

    case SVG_ICONS.COMMENTS_ICON:
      iconXml = COMMENTS_ICON;
      break;

    case SVG_ICONS.SHARE_ICON:
      iconXml = SHARE_ICON;
      break;

    case SVG_ICONS.UPLOAD_ICON:
      iconXml = UPLOAD_ICON;
      break;

    case SVG_ICONS.BOOKING_ICON:
      iconXml = BOOKING_ICON;
      break;

    case SVG_ICONS.TRACKER_ICON:
      iconXml = TRACKER_ICON;
      break;

    case SVG_ICONS.CLOSE_ICON:
      iconXml = CLOSE_ICON;
      break;

    case SVG_ICONS.POST_ICON:
      iconXml = POST_ICON;
      break;

    case SVG_ICONS.ADD_PHOTO_ICON:
      iconXml = ADD_PHOTO_ICON;
      break;

    default:
      iconXml = ACCOUNT_ICON;
      break;
  }

  Icon = () => (
    <SvgXml xml={iconXml} color={color} style={[styles.svgIcon, style]} />
  );

  return <Icon />;
};

export const SVG_ICONS = {
  FORUM_ICON: "FORUM_ICON",
  ACCOUNT_ICON: "ACCOUNT_ICON",
  PRIVATE_CHAT_ICON: "PRIVATE_CHAT_ICON",
  SEARCH_ICON: "SEARCH_ICON",
  FUNNEL_ICON: "FUNNEL_ICON",
  NOTIFICATION_ICON: "NOTIFICATION_ICON",
  GOLD_BADGE_ICON: "GOLD_BADGE_ICON",
  GOLD_STAR_ICON: "GOLD_STAR_ICON",
  THREE_DOTS_ICON: "THREE_DOTS_ICON",
  TAG_ICON: "TAG_ICON",
  LIKE_ICON: "LIKE_ICON",
  COMMENTS_ICON: "COMMENTS_ICON",
  SHARE_ICON: "SHARE_ICON",
  UPLOAD_ICON: "UPLOAD_ICON",
  BOOKING_ICON: "BOOKING_ICON",
  TRACKER_ICON: "TRACKER_ICON",
  CLOSE_ICON: "CLOSE_ICON",
  POST_ICON: "POST_ICON",
  ADD_PHOTO_ICON: "ADD_PHOTO_ICON",
};

const styles = StyleSheet.create({
  svgIcon: {
    color: COLORS.BLACK_ICON,
  },
});

const FORUM_ICON = `<svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M21.5553 2.625H10.1433C9.36306 2.62593 8.61499 2.95638 8.06291 3.54399C7.51083 4.13159 7.19974 4.92845 7.19777 5.76003V8.55709H3.01941C2.3504 8.55872 1.70934 8.84325 1.23698 9.34819C0.76462 9.85314 0.499561 10.5372 0.500001 11.2503V17.1648C0.499561 17.8778 0.76462 18.5619 1.23698 19.0669C1.70934 19.5718 2.3504 19.8564 3.01941 19.858H3.7469V21.7415C3.74627 21.9151 3.79383 22.085 3.8836 22.2299C3.97336 22.3748 4.10132 22.4881 4.25138 22.5557C4.40143 22.6232 4.56688 22.6419 4.7269 22.6095C4.88693 22.5771 5.03438 22.4949 5.1507 22.3734L7.58505 19.858H12.1639C12.8339 19.8573 13.4762 19.5733 13.9499 19.0684C14.4237 18.5635 14.6901 17.8788 14.6908 17.1648V16.2899H15.9492L19.05 19.4971C19.1663 19.6187 19.3137 19.7008 19.4738 19.7332C19.6338 19.7657 19.7992 19.7469 19.9493 19.6794C20.0993 19.6118 20.2273 19.4985 20.3171 19.3536C20.4068 19.2087 20.4544 19.0388 20.4538 18.8652V16.2934H21.5628C22.3425 16.2904 23.0893 15.9583 23.6398 15.3697C24.1903 14.7812 24.4996 13.9842 24.5 13.1531V5.76003C24.4983 4.92853 24.1873 4.13167 23.6354 3.54404C23.0834 2.95641 22.3355 2.62593 21.5553 2.625ZM13.0351 17.1683C13.0349 17.4157 12.9426 17.6528 12.7785 17.8277C12.6144 18.0026 12.3919 18.101 12.1598 18.1012H7.24649C7.03079 18.1003 6.82333 18.1894 6.66846 18.3494L5.39843 19.6661V18.9814C5.39843 18.7479 5.31143 18.5241 5.15657 18.359C5.00171 18.194 4.79167 18.1012 4.57267 18.1012H3.01941C2.78828 18.1001 2.56704 18.0012 2.4043 17.8262C2.24157 17.6513 2.15065 17.4146 2.15153 17.1683V11.2538C2.15065 11.0075 2.24157 10.7708 2.4043 10.5959C2.56704 10.421 2.78828 10.322 3.01941 10.3209H7.19777V13.1531C7.19886 13.9853 7.50957 14.7831 8.06174 15.3715C8.61392 15.9598 9.36249 16.2908 10.1433 16.2917H13.0334L13.0351 17.1683ZM22.8485 13.1531C22.848 13.5185 22.7117 13.8688 22.4692 14.1272C22.2268 14.3856 21.8982 14.531 21.5553 14.5314H19.6206C19.4016 14.5314 19.1915 14.6242 19.0367 14.7892C18.8818 14.9543 18.7948 15.1781 18.7948 15.4116V16.7881L16.8543 14.7814C16.6994 14.6214 16.4919 14.5323 16.2762 14.5332H10.1433C9.80008 14.5327 9.47108 14.3871 9.22849 14.1284C8.98589 13.8697 8.84952 13.5189 8.8493 13.1531V5.76003C8.84974 5.39448 8.98623 5.04404 9.22883 4.78564C9.47142 4.52723 9.8003 4.38198 10.1433 4.38174H21.5553C21.8982 4.38221 22.2268 4.52757 22.4692 4.78595C22.7117 5.04433 22.848 5.39463 22.8485 5.76003V13.1531Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="0.22"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>`;

const ACCOUNT_ICON = `<svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.21 12.71C17.1904 11.9387 17.906 10.8809 18.2572 9.68394C18.6085 8.48697 18.5779 7.21027 18.1698 6.03147C17.7617 4.85267 16.9963 3.83039 15.9801 3.10686C14.9639 2.38332 13.7474 1.99451 12.5 1.99451C11.2525 1.99451 10.0361 2.38332 9.01993 3.10686C8.00374 3.83039 7.23834 4.85267 6.83021 6.03147C6.42208 7.21027 6.39151 8.48697 6.74276 9.68394C7.09401 10.8809 7.8096 11.9387 8.79 12.71C7.11007 13.383 5.64428 14.4994 4.54889 15.9399C3.45349 17.3805 2.76956 19.0913 2.57 20.89C2.55555 21.0213 2.56711 21.1542 2.60402 21.2811C2.64093 21.4079 2.70246 21.5263 2.78511 21.6293C2.95202 21.8375 3.19478 21.9708 3.46 22C3.72521 22.0292 3.99116 21.9518 4.19932 21.7849C4.40749 21.618 4.54082 21.3752 4.57 21.11C4.78958 19.1552 5.72168 17.3498 7.18822 16.0388C8.65475 14.7278 10.5529 14.003 12.52 14.003C14.4871 14.003 16.3852 14.7278 17.8518 16.0388C19.3183 17.3498 20.2504 19.1552 20.47 21.11C20.4972 21.3557 20.6144 21.5827 20.7991 21.747C20.9838 21.9114 21.2228 22.0015 21.47 22H21.58C21.8421 21.9698 22.0817 21.8373 22.2466 21.6313C22.4114 21.4252 22.4881 21.1624 22.46 20.9C22.2595 19.0962 21.5719 17.381 20.4708 15.9382C19.3698 14.4954 17.8969 13.3795 16.21 12.71ZM12.5 12C11.7089 12 10.9355 11.7654 10.2777 11.3259C9.61992 10.8864 9.10723 10.2616 8.80448 9.53074C8.50173 8.79983 8.42251 7.99557 8.57686 7.21964C8.7312 6.44372 9.11216 5.73099 9.67157 5.17158C10.231 4.61217 10.9437 4.2312 11.7196 4.07686C12.4956 3.92252 13.2998 4.00173 14.0307 4.30448C14.7616 4.60724 15.3863 5.11993 15.8259 5.77772C16.2654 6.43552 16.5 7.20888 16.5 8C16.5 9.06087 16.0786 10.0783 15.3284 10.8284C14.5783 11.5786 13.5609 12 12.5 12Z"
      fill="currentColor"
    />
  </svg>`;

const PRIVATE_CHAT_ICON = `<svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.61005 20.8628C4.939 20.9992 5.301 21.0349 5.65026 20.9655C5.99952 20.896 6.32034 20.7246 6.57214 20.4728L8.44722 18.6007H18.5007C19.2964 18.6007 20.0595 18.2846 20.6221 17.722C21.1847 17.1594 21.5008 16.3963 21.5008 15.6006V6.00014C21.5008 5.20445 21.1847 4.44135 20.6221 3.87872C20.0595 3.31608 19.2964 3 18.5007 3H6.50014C5.70445 3 4.94135 3.31608 4.37872 3.87872C3.81608 4.44135 3.5 5.20445 3.5 6.00014V19.2007C3.5001 19.5565 3.60559 19.9042 3.80316 20.2C4.00072 20.4958 4.2815 20.7264 4.61005 20.8628ZM18.5007 16.8006H7.70019L5.30008 19.2007V8.82026L9.80029 12.0364C10.5881 12.5994 11.5321 12.902 12.5004 12.902C13.4687 12.902 14.4127 12.5994 15.2005 12.0364L19.7007 8.82026V15.6006C19.7007 15.9188 19.5743 16.2241 19.3492 16.4491C19.1242 16.6742 18.819 16.8006 18.5007 16.8006ZM6.50014 4.80008H18.5007C18.819 4.80008 19.1242 4.92652 19.3492 5.15157C19.5743 5.37662 19.7007 5.68186 19.7007 6.00014V6.60016L14.1535 10.5693C13.6717 10.9125 13.0949 11.0969 12.5034 11.0969C11.9119 11.0969 11.3351 10.9125 10.8533 10.5693L5.30008 6.60016V6.00014C5.30008 5.68186 5.42652 5.37662 5.65157 5.15157C5.87662 4.92652 6.18186 4.80008 6.50014 4.80008Z" fill="currentColor" stroke="#A0A4A8" stroke-width="0.35"/>
</svg>
`;

const SEARCH_ICON = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="none"/>
<path d="M23 31C27.4183 31 31 27.4183 31 23C31 18.5817 27.4183 15 23 15C18.5817 15 15 18.5817 15 23C15 27.4183 18.5817 31 23 31Z" stroke="#52575C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.175 33.175L28.825 28.825" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const FUNNEL_ICON = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="none"/>
<path d="M34 15H14L22 24.46V31L26 33V24.46L34 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const NOTIFICATION_ICON = `
<svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="49" fill="none"/>
<path d="M30 21C30 19.4087 29.3679 17.8826 28.2426 16.7574C27.1174 15.6321 25.5913 15 24 15C22.4087 15 20.8826 15.6321 19.7574 16.7574C18.6321 17.8826 18 19.4087 18 21C18 28 15 30 15 30H33C33 30 30 28 30 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.73 34C25.5542 34.3031 25.3019 34.5547 24.9982 34.7295C24.6946 34.9044 24.3504 34.9965 24 34.9965C23.6496 34.9965 23.3054 34.9044 23.0018 34.7295C22.6982 34.5547 22.4458 34.3031 22.27 34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const GOLD_BADGE_ICON = `<svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.42065 20V11.0079H10.6863V20L7.55471 17.3617L4.42065 20Z" fill="url(#paint0_linear)"/>
<path d="M5.10124 19.4275V11.0078H4.88245V19.6156L5.10124 19.4275ZM10.2011 19.5947V11.0078H9.98229V19.4075L10.2011 19.5947Z" fill="url(#paint1_linear)"/>
<path d="M7.49814 0C7.36777 0 7.23926 0.00368162 7.11075 0.0110451C6.77924 0.0276128 6.45331 0.0662708 6.13298 0.123337C5.26322 0.281651 4.44562 0.589075 3.7081 1.01984C3.33747 1.23338 2.9892 1.48005 2.66327 1.7525C1.61286 2.62875 0.812018 3.78481 0.374347 5.10102C0.130369 5.82816 0 6.60685 0 7.41498C0 8.71463 0.340824 9.93696 0.936801 11.001C2.21629 13.2818 4.68028 14.83 7.5 14.83C11.6365 14.83 15 11.5035 15 7.41498C14.9981 3.32643 11.6346 0 7.49814 0ZM7.49814 14.0679C5.00248 14.0679 2.82344 12.724 1.66129 10.7285C1.09325 9.75288 0.76732 8.62075 0.76732 7.41498C0.76732 7.34319 0.769183 7.27324 0.771045 7.20145C0.772908 7.14438 0.774769 7.08731 0.778494 7.03024C0.780356 6.99711 0.782219 6.96213 0.784081 6.92716C0.785943 6.88298 0.789671 6.84064 0.795258 6.79646C0.800845 6.71914 0.810155 6.64182 0.819468 6.56635C0.823192 6.53321 0.82878 6.49824 0.834367 6.46326C0.841817 6.40435 0.851131 6.34544 0.862305 6.28654C0.87348 6.22211 0.886516 6.15584 0.899553 6.09325C0.916315 6.00305 0.936802 5.91468 0.961014 5.82632C0.974051 5.76741 0.988949 5.71035 1.00571 5.65328C1.00757 5.64776 1.00944 5.6404 1.0113 5.63487C1.02992 5.57044 1.04855 5.50417 1.06904 5.43974C1.07462 5.42317 1.08021 5.40477 1.0858 5.3882C1.1007 5.34034 1.11746 5.29247 1.13236 5.24645C1.13608 5.23725 1.13794 5.22988 1.14167 5.22068C1.14353 5.21332 1.14726 5.20595 1.14912 5.19859C1.16774 5.14336 1.19009 5.08814 1.21058 5.03475C1.2143 5.02739 1.21617 5.02003 1.21989 5.01266C1.2441 4.95007 1.26831 4.88932 1.29439 4.82858C1.29625 4.82489 1.29811 4.82121 1.29997 4.81753C1.32791 4.75126 1.35771 4.68499 1.38937 4.61872C1.41731 4.55797 1.44524 4.49906 1.47504 4.44015C1.47877 4.43279 1.48249 4.42359 1.48808 4.41622C1.51602 4.35916 1.54768 4.30209 1.57748 4.24686C1.5812 4.24134 1.58306 4.23766 1.58493 4.23214C1.62031 4.16955 1.6557 4.10696 1.69295 4.04437C1.72833 3.98362 1.76558 3.92287 1.80469 3.86397C1.80656 3.86212 1.80655 3.86028 1.80842 3.86028C1.8438 3.8069 1.87919 3.75167 1.91458 3.69829C1.92016 3.69092 1.92575 3.68356 1.92948 3.6762C1.97045 3.61913 2.00956 3.56206 2.05053 3.50684C2.09337 3.44977 2.1362 3.39271 2.1809 3.33564C2.22188 3.28409 2.26099 3.23439 2.30196 3.18653C2.31127 3.17548 2.31872 3.16444 2.3299 3.15339C2.37087 3.10369 2.41371 3.05399 2.45841 3.00612C2.55339 2.89751 2.6521 2.79443 2.7564 2.69502C2.80668 2.64532 2.85883 2.59561 2.91098 2.54775C2.91284 2.54591 2.91284 2.54591 2.91284 2.54591C2.96499 2.49805 3.019 2.45018 3.07301 2.40416C3.07859 2.39864 3.08604 2.39312 3.09163 2.3876C3.14005 2.34526 3.18848 2.30476 3.23876 2.2661C3.29091 2.22376 3.34306 2.18326 3.39521 2.14276C3.40266 2.1354 3.41197 2.12988 3.41942 2.12435C3.47157 2.08569 3.52371 2.04704 3.57586 2.01022C3.63174 1.97156 3.68761 1.9329 3.74534 1.89609C3.75652 1.88872 3.76769 1.88136 3.77887 1.874C3.82915 1.83902 3.8813 1.80772 3.93345 1.77459C3.9409 1.76907 3.94835 1.76354 3.9558 1.75986C4.00422 1.72857 4.05265 1.70095 4.10107 1.67334C4.11597 1.66414 4.13273 1.65493 4.14763 1.64573C4.19419 1.61996 4.24261 1.59234 4.28917 1.56657C4.3376 1.5408 4.38416 1.51503 4.43258 1.4911C4.46983 1.47269 4.50894 1.45244 4.54805 1.43403C4.58716 1.41562 4.62627 1.39721 4.66538 1.3788C4.72126 1.35303 4.77713 1.32726 4.833 1.30517C4.86839 1.29044 4.90378 1.27572 4.93916 1.26099C4.97269 1.24626 5.00807 1.23338 5.04346 1.21865C5.07884 1.20392 5.11609 1.19104 5.15334 1.17815C5.2148 1.15422 5.27812 1.13213 5.33958 1.11188C5.38056 1.09715 5.42153 1.08427 5.4625 1.07138C5.72324 0.988542 5.99143 0.922271 6.26707 0.872568C6.31736 0.863363 6.36951 0.854159 6.41979 0.846796C6.46449 0.839432 6.50732 0.83391 6.55202 0.828387C6.59486 0.822865 6.6377 0.815501 6.6824 0.811819C6.73641 0.804456 6.79042 0.798933 6.84443 0.795252C6.89844 0.789729 6.95058 0.784206 7.00459 0.782366C7.05488 0.778684 7.10144 0.775002 7.15173 0.773161C7.2076 0.76948 7.26347 0.767639 7.31935 0.765798H7.32679C7.38267 0.763957 7.4404 0.763957 7.49814 0.763957C11.2155 0.763957 14.229 3.74247 14.229 7.41498C14.229 11.0875 11.2137 14.0679 7.49814 14.0679Z" fill="url(#paint2_linear)"/>
<path d="M7.49815 0.762268C7.44228 0.762268 7.38454 0.764109 7.32681 0.764109H7.31936C7.26349 0.76595 7.20761 0.767791 7.15174 0.771472C7.10332 0.773313 7.05489 0.776995 7.00461 0.780677C6.98785 0.782518 6.97108 0.782518 6.95618 0.784358H6.95246C6.91708 0.786199 6.87983 0.789881 6.84444 0.793563C6.79043 0.799085 6.73456 0.804608 6.68241 0.81013C6.63957 0.815653 6.59674 0.821176 6.55204 0.826698C6.50734 0.832221 6.4645 0.839584 6.41981 0.845107C6.36766 0.85247 6.31737 0.861675 6.26709 0.870879C5.99331 0.920582 5.72512 0.986853 5.46252 1.06969C5.42154 1.08258 5.38057 1.09546 5.3396 1.11019C5.27627 1.13044 5.21481 1.15253 5.15335 1.17646C5.11611 1.18935 5.08072 1.20223 5.04347 1.21696C5.00809 1.22985 4.9727 1.24457 4.93918 1.2593C4.90379 1.27403 4.8684 1.28691 4.83302 1.30348C4.77714 1.32741 4.72127 1.35318 4.6654 1.37712C4.62629 1.39368 4.58718 1.41209 4.54806 1.43234C4.50895 1.45075 4.47171 1.46916 4.4326 1.48941C4.38417 1.51334 4.33575 1.53911 4.28919 1.56488C4.24263 1.59066 4.1942 1.61643 4.14764 1.64404C4.13274 1.65324 4.11598 1.66245 4.10108 1.67165C4.05266 1.69927 4.00424 1.72688 3.95581 1.75817C3.94836 1.76186 3.94091 1.76738 3.93346 1.7729C3.88131 1.80419 3.82917 1.83733 3.77888 1.87231C3.76771 1.87783 3.75653 1.88519 3.74536 1.8944C3.71742 1.91281 3.68949 1.93121 3.66155 1.95146C3.64665 1.96067 3.63361 1.96987 3.61871 1.97908C3.60381 1.98828 3.59078 1.99749 3.57588 2.00669C3.52373 2.04351 3.47158 2.08216 3.41943 2.12082C3.41198 2.12635 3.40453 2.13187 3.39522 2.13923C3.34121 2.17973 3.28906 2.22023 3.23878 2.26257C3.18849 2.30307 3.14007 2.34357 3.09164 2.38407C3.08606 2.38959 3.07861 2.39511 3.07302 2.40063C3.01901 2.44665 2.965 2.49452 2.91285 2.54238C2.91285 2.54422 2.91099 2.54422 2.91099 2.54422C2.85884 2.59208 2.80669 2.64179 2.75641 2.69149C2.65398 2.7909 2.55527 2.89398 2.45842 3.00259C2.41372 3.05046 2.37089 3.10016 2.32991 3.14986C2.31874 3.16091 2.31129 3.17195 2.30198 3.183C2.261 3.2327 2.22003 3.28241 2.18092 3.33211C2.13622 3.38733 2.09338 3.4444 2.05055 3.50331C2.00957 3.55853 1.9686 3.6156 1.92949 3.67267C1.9239 3.68003 1.91832 3.68739 1.91459 3.69476C1.8792 3.74814 1.84195 3.80337 1.80843 3.85675C1.80657 3.85859 1.80657 3.86044 1.80471 3.86044C1.76746 3.92118 1.73021 3.98009 1.69296 4.04084C1.65571 4.10343 1.62033 4.16418 1.58494 4.22861C1.58122 4.23413 1.57935 4.23781 1.57749 4.24333C1.54769 4.29856 1.51603 4.35563 1.4881 4.41269C1.48251 4.42006 1.47878 4.42926 1.47506 4.43662C1.44526 4.49553 1.41732 4.55444 1.38938 4.61519C1.35772 4.67962 1.32793 4.74589 1.29999 4.814C1.29813 4.81768 1.29626 4.82136 1.2944 4.82505C1.26833 4.88579 1.24225 4.94654 1.21991 5.00913C1.21618 5.0165 1.21432 5.02386 1.21059 5.03122C1.19011 5.08461 1.16962 5.14167 1.14913 5.19506C1.14355 5.20979 1.1361 5.22635 1.13237 5.24292C1.11561 5.28894 1.09885 5.33681 1.08581 5.38467C1.08022 5.40124 1.07464 5.41964 1.06905 5.43621C1.05043 5.50064 1.02994 5.56691 1.01131 5.63134C1.00945 5.63687 1.00759 5.64423 1.00572 5.64975C0.988963 5.70682 0.974065 5.76389 0.961028 5.82279C0.938679 5.91115 0.918192 5.99951 0.899568 6.08972C0.886531 6.15415 0.873494 6.21858 0.86232 6.28301C0.851145 6.34007 0.843694 6.39898 0.834382 6.45973C0.828794 6.49471 0.823207 6.52968 0.819482 6.56282C0.808307 6.63829 0.800859 6.71561 0.795272 6.79292C0.789685 6.83711 0.785958 6.87945 0.784095 6.92363C0.78037 6.9586 0.778508 6.99358 0.778508 7.02671C0.774783 7.08378 0.77106 7.14085 0.77106 7.19791C0.767335 7.26971 0.767334 7.33966 0.767334 7.41145C0.767334 11.0858 3.78074 14.0643 7.49815 14.0643C11.2156 14.0643 14.229 11.0858 14.229 7.41145C14.229 3.7371 11.2137 0.762268 7.49815 0.762268ZM7.49815 13.304C4.21283 13.304 1.53838 10.6624 1.53838 7.4133C1.53838 5.40676 2.55899 3.63217 4.11412 2.56815C4.14206 2.5479 4.16999 2.52949 4.19979 2.51109C5.0621 1.94226 6.08271 1.59066 7.17968 1.53359C7.21506 1.53175 7.25231 1.52991 7.28956 1.52807C7.35847 1.52438 7.42738 1.52438 7.49815 1.52438C10.7835 1.52438 13.4561 4.16602 13.4561 7.4133C13.4561 10.6624 10.7835 13.304 7.49815 13.304Z" fill="url(#paint3_linear)"/>
<path d="M0.66484 7.41318C0.66484 7.34138 0.666703 7.26775 0.668566 7.19779C0.670428 7.13889 0.672292 7.07998 0.676017 7.02475C0.67788 6.98978 0.679742 6.95296 0.681604 6.91982C0.683467 6.8738 0.687191 6.82778 0.692778 6.78544C0.698366 6.70629 0.707676 6.62713 0.716988 6.54981C0.720713 6.51484 0.7263 6.47986 0.731888 6.44488C0.739337 6.38413 0.750514 6.32523 0.759826 6.26632C0.771 6.20005 0.784037 6.13378 0.797074 6.07119C0.813836 5.98467 0.834323 5.89631 0.858534 5.80058C0.871571 5.74167 0.888331 5.68277 0.903231 5.6257C0.905093 5.6165 0.906958 5.60729 0.908821 5.60361C0.927445 5.53734 0.94793 5.47291 0.968417 5.40296L0.975868 5.38271C0.979593 5.37166 0.983316 5.36062 0.985178 5.35509C0.990765 5.33669 0.996354 5.31644 1.0038 5.29803L0.439488 5.21335C0.214134 5.91656 0.0986642 6.64922 0.0968018 7.39477L0.66484 7.41318Z" fill="url(#paint4_linear)"/>
<path d="M0.760124 8.52517C0.724738 8.30973 0.696802 8.09246 0.681903 7.87518L0.115723 7.88439C0.130622 8.1164 0.15856 8.3484 0.195809 8.57857L0.760124 8.52517Z" fill="url(#paint5_linear)"/>
<path d="M14.3519 7.30638C14.3537 7.37817 14.3519 7.45181 14.35 7.52176C14.35 7.58067 14.3481 7.63958 14.3444 7.6948C14.3444 7.72978 14.3425 7.7666 14.3388 7.79973C14.337 7.84575 14.3332 7.89177 14.3295 7.93411C14.3239 8.01327 14.3165 8.09243 14.3072 8.16975C14.3034 8.20472 14.2979 8.2397 14.2941 8.27467C14.2867 8.33542 14.2774 8.39433 14.2681 8.45508C14.2569 8.52135 14.2457 8.58762 14.2327 8.65205C14.2178 8.73857 14.1973 8.82877 14.1749 8.92266C14.1619 8.98156 14.147 9.04047 14.1321 9.09938C14.1302 9.10858 14.1284 9.11779 14.1265 9.12147C14.1079 9.18774 14.0893 9.25217 14.0688 9.32396L14.0632 9.34421C14.0595 9.35526 14.0557 9.3663 14.0539 9.37183C14.0483 9.39024 14.0427 9.41049 14.0371 9.42889L14.6014 9.50621C14.8175 8.80116 14.9218 8.06666 14.9143 7.32111L14.3519 7.30638Z" fill="url(#paint6_linear)"/>
<path d="M14.2419 6.19638C14.2811 6.41182 14.3109 6.62725 14.3295 6.84453L14.8957 6.82796C14.877 6.59595 14.8454 6.36394 14.8044 6.13562L14.2419 6.19638Z" fill="url(#paint7_linear)"/>
<ellipse cx="7.45475" cy="7.40577" rx="6.05289" ry="5.98279" fill="url(#paint8_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="7.55304" y1="19.1743" x2="7.55304" y2="13.1464" gradientUnits="userSpaceOnUse">
<stop stop-color="#161A1F"/>
<stop offset="0.14" stop-color="#2A323B"/>
<stop offset="0.26" stop-color="#343F4A"/>
<stop offset="0.36" stop-color="#2A323B"/>
<stop offset="0.49" stop-color="#161A1F"/>
<stop offset="0.61" stop-color="#2A323B"/>
<stop offset="0.74" stop-color="#343F4A"/>
<stop offset="0.84" stop-color="#2A323B"/>
<stop offset="1" stop-color="#161A1F"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="7.54134" y1="18.8208" x2="7.54134" y2="13.0536" gradientUnits="userSpaceOnUse">
<stop stop-color="#B07515"/>
<stop offset="0.09" stop-color="#E1BA60"/>
<stop offset="0.14" stop-color="#F5D77F"/>
<stop offset="0.26" stop-color="#FFFFD7"/>
<stop offset="0.36" stop-color="#F5D77F"/>
<stop offset="0.49" stop-color="#B07515"/>
<stop offset="0.57" stop-color="#E1BA60"/>
<stop offset="0.61" stop-color="#F5D77F"/>
<stop offset="0.74" stop-color="#FFFFD7"/>
<stop offset="0.84" stop-color="#F5D77F"/>
<stop offset="1" stop-color="#B07515"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="12.086" y1="13.3257" x2="0.00482259" y2="-2.61571" gradientUnits="userSpaceOnUse">
<stop stop-color="#926842"/>
<stop offset="0.5459" stop-color="#FAE2A8"/>
<stop offset="1" stop-color="#AB8255"/>
</linearGradient>
<linearGradient id="paint3_linear" x1="2.88839" y1="2.35883" x2="17.7041" y2="18.9967" gradientUnits="userSpaceOnUse">
<stop stop-color="#926842"/>
<stop offset="0.5459" stop-color="#FAE2A8"/>
<stop offset="1" stop-color="#AB8255"/>
</linearGradient>
<linearGradient id="paint4_linear" x1="0.554781" y1="-3.49882" x2="0.506551" y2="14.3359" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6BD86"/>
<stop offset="0.9983" stop-color="#876340"/>
</linearGradient>
<linearGradient id="paint5_linear" x1="0.436694" y1="8.19281" x2="0.37904" y2="4.53851" gradientUnits="userSpaceOnUse">
<stop stop-color="#F5F5FF"/>
<stop offset="1" stop-color="#00001C"/>
</linearGradient>
<linearGradient id="paint6_linear" x1="14.4845" y1="3.32871" x2="14.4776" y2="9.07455" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6BD86"/>
<stop offset="0.9983" stop-color="#876340"/>
</linearGradient>
<linearGradient id="paint7_linear" x1="14.572" y1="3.32807" x2="14.5651" y2="9.07546" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6BD86"/>
<stop offset="0.9983" stop-color="#876340"/>
</linearGradient>
<linearGradient id="paint8_linear" x1="11.1559" y1="12.1749" x2="1.40883" y2="-0.68985" gradientUnits="userSpaceOnUse">
<stop stop-color="#926842"/>
<stop offset="0.5459" stop-color="#FAE2A8"/>
<stop offset="1" stop-color="#AB8255"/>
</linearGradient>
</defs>
</svg>
`;

const GOLD_STAR_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.58011 2.49141C6.77711 2.18669 7.22289 2.18669 7.41989 2.49141L8.24032 3.76046C8.57765 4.28225 9.09721 4.65973 9.69771 4.81931L11.1582 5.20743C11.5089 5.30062 11.6466 5.72459 11.4177 6.00611L10.4643 7.17854C10.0723 7.66061 9.8738 8.27138 9.90759 8.8918L9.98978 10.4007C10.0095 10.763 9.64887 11.0251 9.31038 10.8943L7.90072 10.3499C7.3211 10.126 6.6789 10.126 6.09928 10.3499L4.68962 10.8943C4.35113 11.0251 3.99048 10.763 4.01022 10.4007L4.09241 8.8918C4.1262 8.27138 3.92775 7.66061 3.53573 7.17854L2.58232 6.00611C2.35339 5.72459 2.49115 5.30062 2.84183 5.20743L4.30229 4.81931C4.90279 4.65973 5.42235 4.28225 5.75968 3.76046L6.58011 2.49141Z" fill="url(#paint0_linear)" stroke="url(#paint1_linear)" stroke-width="2"/>
<defs>
<linearGradient id="paint0_linear" x1="7" y1="0" x2="7" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFD865"/>
<stop offset="0.0677083" stop-color="#FFD762"/>
<stop offset="0.473958" stop-color="#FED14E"/>
<stop offset="1" stop-color="#FFCB32"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="7" y1="0" x2="7" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#F5D36C"/>
<stop offset="1" stop-color="#FECF47"/>
</linearGradient>
</defs>
</svg>
`;

const THREE_DOTS_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99996 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 9.99996 9.16667C9.53972 9.16667 9.16663 9.53976 9.16663 10C9.16663 10.4602 9.53972 10.8333 9.99996 10.8333Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99996 5C10.4602 5 10.8333 4.6269 10.8333 4.16667C10.8333 3.70643 10.4602 3.33333 9.99996 3.33333C9.53972 3.33333 9.16663 3.70643 9.16663 4.16667C9.16663 4.6269 9.53972 5 9.99996 5Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99996 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 9.99996 15C9.53972 15 9.16663 15.3731 9.16663 15.8333C9.16663 16.2936 9.53972 16.6667 9.99996 16.6667Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const TAG_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7267 8.94L8.94671 13.72C8.82288 13.844 8.67583 13.9423 8.51396 14.0094C8.3521 14.0765 8.17859 14.111 8.00337 14.111C7.82815 14.111 7.65465 14.0765 7.49279 14.0094C7.33092 13.9423 7.18387 13.844 7.06004 13.72L1.33337 8V1.33333H8.00004L13.7267 7.06C13.975 7.30982 14.1144 7.64775 14.1144 8C14.1144 8.35225 13.975 8.69018 13.7267 8.94V8.94Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66663 4.66666H4.67246" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const LIKE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66671 14.6667H2.66671C2.31309 14.6667 1.97395 14.5262 1.7239 14.2761C1.47385 14.0261 1.33337 13.687 1.33337 13.3333V8.66667C1.33337 8.31304 1.47385 7.97391 1.7239 7.72386C1.97395 7.47381 2.31309 7.33333 2.66671 7.33333H4.66671M9.33337 6V3.33333C9.33337 2.8029 9.12266 2.29419 8.74759 1.91912C8.37251 1.54405 7.86381 1.33333 7.33337 1.33333L4.66671 7.33333V14.6667H12.1867C12.5083 14.6703 12.8203 14.5576 13.0653 14.3493C13.3103 14.1411 13.4718 13.8513 13.52 13.5333L14.44 7.53333C14.469 7.34224 14.4562 7.14712 14.4023 6.9615C14.3484 6.77588 14.2548 6.6042 14.1279 6.45834C14.0011 6.31249 13.8441 6.19595 13.6678 6.11681C13.4914 6.03767 13.3 5.99781 13.1067 6H9.33337Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const COMMENTS_ICON = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 10C14.5 10.3536 14.3595 10.6928 14.1095 10.9428C13.8594 11.1929 13.5203 11.3333 13.1667 11.3333H5.16667L2.5 14V3.33333C2.5 2.97971 2.64048 2.64057 2.89052 2.39052C3.14057 2.14048 3.47971 2 3.83333 2H13.1667C13.5203 2 13.8594 2.14048 14.1095 2.39052C14.3595 2.64057 14.5 2.97971 14.5 3.33333V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const SHARE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66663 8V13.3333C2.66663 13.687 2.8071 14.0261 3.05715 14.2761C3.3072 14.5262 3.64634 14.6667 3.99996 14.6667H12C12.3536 14.6667 12.6927 14.5262 12.9428 14.2761C13.1928 14.0261 13.3333 13.687 13.3333 13.3333V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 4L8.00004 1.33333L5.33337 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 1.33333V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const UPLOAD_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M8 17L12 21L16 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.88 18.0899C21.7494 17.4786 22.4014 16.6061 22.7413 15.5991C23.0812 14.5921 23.0914 13.503 22.7704 12.4898C22.4494 11.4766 21.8139 10.592 20.9561 9.96449C20.0983 9.33697 19.0628 8.9991 18 8.99993H16.74C16.4392 7.82781 15.8765 6.73918 15.0941 5.81601C14.3118 4.89285 13.3301 4.15919 12.2232 3.67029C11.1163 3.18138 9.91285 2.94996 8.70353 2.99345C7.49421 3.03694 6.31051 3.3542 5.24155 3.92136C4.17259 4.48851 3.24623 5.29078 2.53219 6.26776C1.81815 7.24474 1.33505 8.37098 1.11926 9.56168C0.903472 10.7524 0.960612 11.9765 1.28638 13.142C1.61215 14.3074 2.19806 15.3837 3 16.2899" stroke="#19A5B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const BOOKING_ICON = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 2C9.52219 2 7.58879 2.58649 5.9443 3.6853C4.29981 4.78412 3.01809 6.3459 2.26121 8.17317C1.50433 10.0004 1.3063 12.0111 1.69215 13.9509C2.078 15.8907 3.03041 17.6725 4.42894 19.0711C5.82746 20.4696 7.60929 21.422 9.5491 21.8079C11.4889 22.1937 13.4996 21.9957 15.3268 21.2388C17.1541 20.4819 18.7159 19.2002 19.8147 17.5557C20.9135 15.9112 21.5 13.9778 21.5 12C21.5 10.6868 21.2413 9.38642 20.7388 8.17317C20.2363 6.95991 19.4997 5.85752 18.5711 4.92893C17.6425 4.00035 16.5401 3.26375 15.3268 2.7612C14.1136 2.25866 12.8132 2 11.5 2ZM11.5 20C9.91775 20 8.37104 19.5308 7.05544 18.6518C5.73985 17.7727 4.71447 16.5233 4.10897 15.0615C3.50347 13.5997 3.34504 11.9911 3.65372 10.4393C3.9624 8.88743 4.72433 7.46197 5.84315 6.34315C6.96197 5.22433 8.38743 4.4624 9.93928 4.15372C11.4911 3.84504 13.0997 4.00346 14.5615 4.60896C16.0233 5.21447 17.2727 6.23984 18.1518 7.55544C19.0308 8.87103 19.5 10.4177 19.5 12C19.5 14.1217 18.6572 16.1566 17.1569 17.6569C15.6566 19.1571 13.6217 20 11.5 20ZM11.5 6C11.2348 6 10.9804 6.10536 10.7929 6.29289C10.6054 6.48043 10.5 6.73478 10.5 7V11H8.5C8.23479 11 7.98043 11.1054 7.7929 11.2929C7.60536 11.4804 7.5 11.7348 7.5 12C7.5 12.2652 7.60536 12.5196 7.7929 12.7071C7.98043 12.8946 8.23479 13 8.5 13H11.5C11.7652 13 12.0196 12.8946 12.2071 12.7071C12.3946 12.5196 12.5 12.2652 12.5 12V7C12.5 6.73478 12.3946 6.48043 12.2071 6.29289C12.0196 6.10536 11.7652 6 11.5 6Z" fill="currentColor"/>
</svg>
`;

const TRACKER_ICON = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 12H18.5L15.5 21L9.5 3L6.5 12H2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CLOSE_ICON = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="#DEF3F4"/>
<path d="M23 11L11 23" stroke="#19A5B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 11L23 23" stroke="#19A5B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const POST_ICON = `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<circle cx="45" cy="41" r="30" fill="#19A5B0"/>
<path d="M44 33H37C36.4696 33 35.9609 33.2107 35.5858 33.5858C35.2107 33.9609 35 34.4696 35 35V49C35 49.5304 35.2107 50.0391 35.5858 50.4142C35.9609 50.7893 36.4696 51 37 51H51C51.5304 51 52.0391 50.7893 52.4142 50.4142C52.7893 50.0391 53 49.5304 53 49V42" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M51.5 31.5C51.8978 31.1022 52.4374 30.8787 53 30.8787C53.5626 30.8787 54.1022 31.1022 54.5 31.5C54.8978 31.8978 55.1213 32.4374 55.1213 33C55.1213 33.5626 54.8978 34.1022 54.5 34.5L45 44L41 45L42 41L51.5 31.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="90" height="90" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="7.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>`;

const ADD_PHOTO_ICON = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#A0A4A8" stroke-dasharray="5 5"/>
<path d="M18 12.1667V23.8333" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.1667 18H23.8333" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default SvgIcon;
