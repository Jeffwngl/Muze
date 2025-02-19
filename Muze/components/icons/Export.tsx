import React from 'react';
import { icons, IconName } from './Icons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
  pad: string;
}

export default function Icon({ name, size = 24, color = 'currentColor', pad = '0 5px'}: IconProps) {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <div style={{ width: size, height: size, color, padding: pad }}>
      <SvgIcon/>
    </div>
  );
}
