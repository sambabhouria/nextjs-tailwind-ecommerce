/* eslint-disable react/display-name */
import Link from 'next/link';
import { forwardRef } from 'react';
import React from 'react';

const DropdownLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href} ref={ref} legacyBehavior>
      <a {...rest}>{children}</a>
    </Link>
  );
});

export default DropdownLink;
