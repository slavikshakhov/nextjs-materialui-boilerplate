import React from 'react';

import { withTranslation } from '../i18n'

const index = ({t}) => {
  return (
    <>
      from index
    </>
  );
}

export default withTranslation()(index)