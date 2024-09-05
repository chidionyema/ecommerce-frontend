import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router';
import React from 'react';

const BreadcrumbNavigation: React.FC = () => {
    const router = useRouter();
    const pathnames = router.pathname.split('/').filter((x) => x);

    return (
        <Box sx={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{
                    '& .MuiBreadcrumbs-ol': { alignItems: 'center' },
                    '& .MuiBreadcrumbs-separator': { margin: '0 0.5rem' },
                }}
            >
                <Link
                    color="inherit"
                    href="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main',
                        },
                        fontSize: '0.875rem',
                    }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Home
                </Link>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                        <Typography
                            color="textPrimary"
                            key={to}
                            sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize', fontSize: '0.875rem', fontWeight: 500 }}
                        >
                            {value.replace(/-/g, ' ')}
                        </Typography>
                    ) : (
                        <Link
                            color="inherit"
                            href={to}
                            key={to}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: 'primary.main',
                                },
                                textTransform: 'capitalize',
                                fontSize: '0.875rem',
                            }}
                        >
                            {value.replace(/-/g, ' ')}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
};

export default BreadcrumbNavigation;
