import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from '~/pages/_errors/errors.module.scss';
import { ButtonNavigate, ErrorPageProps } from '~/pages/_errors/errors.types';
import { Button } from '~/ui-components/button/button.component';
import { logo } from '~/utils/configuration/logo';
import { planPath } from '~/utils/configuration/routes-paths';

const ErrorPage: FC<ErrorPageProps> = ({
  pageType,
  buttonNavigate,
  showButton = true,
  showLogo = true,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {showLogo && (
          <div className={styles.image}>
            <img src={logo[i18n.language]} alt={t('PROJECT_NAME')} />
          </div>
        )}
        <span className={styles.text1}>{t(`ERROR.${pageType}.TEXT1`)}</span>
        <span className={styles.text2}>{t(`ERROR.${pageType}.TEXT2`)}</span>
        {showButton && (
          <Button
            className={styles.button}
            onClick={() =>
              buttonNavigate === ButtonNavigate.Back ? navigate(-1) : navigate(`/${planPath}`)
            }
          >
            {t(`BUTTON.${buttonNavigate}`)}
          </Button>
        )}
      </div>
    </div>
  );
};

export { ErrorPage };
