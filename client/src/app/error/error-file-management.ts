

export abstract class ErrorFileManagement {

        /* File upload */
        selectedFiles: FileList;
        currentFileUpload: File;
        progress: { percentage: number } = { percentage: 0 };
    
        selectFileForError(event) {
            this.selectedFiles = event.target.files;
            this.uploadFileForError();
            event = null;
            return false;
        }
        
        uploadFileForError() {
            this.progress.percentage = 0;
            this.currentFileUpload = this.selectedFiles.item(0);
            this.errorService.uploadFile(this.currentFileUpload, this.error.errid)
                .subscribe(event => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress.percentage = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        this.toastService.success(`${this.currentFileUpload.name} is uploaded`);
                        this.error = event.body;
                        this.currentFileUpload = undefined;
                    }
                });
            this.selectedFiles = undefined;
        }
    
        download(file) {
            this.errorService.downloadFile(file.errorDocId)
                .subscribe(res => {
                    saveAs(res.body, file.filename);
                });
        }
    
        showFile(file) {
            const fileToShow: any = document.getElementById(`file-${file.errorDocId}`);
            this.errorService.downloadFile(file.errorDocId)
                .subscribe(res => {
                    const url = URL.createObjectURL(res.body);
                    fileToShow.addEventListener('load', () => URL.revokeObjectURL(url));
                    fileToShow.src = url;
                });
    
        }
    
        delete(file) {
            this.errorService.deleteFile(file.errorDocId)
                .subscribe(res => {
                    this.toastService.success(`${file.filename} is deleted`);
                    this.error = res;
                });
        }
}