import { makeStyles, typographyStyles } from '@fluentui/react-components';

export interface PageHeaderProps {
    title: string;
}

const useStyles = makeStyles({
    pageTitle: typographyStyles.subtitle1,
});

export const PageHeader = (props: PageHeaderProps) => {
    const styles = useStyles();

    return (
        <header className='shadow-card sm:p-2 lg:pl-5'>
            <span className={styles.pageTitle}>{props.title}</span>
        </header>        
    )
}