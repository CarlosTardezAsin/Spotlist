import serverInstance from "./app";

let port = process.env.APP_PORT || 8000;
serverInstance.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Environment: ${process.env.SKELETON_ENV}`);
    console.log('Press CTRL-C to stop')
});
