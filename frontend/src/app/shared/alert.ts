import swal from 'sweetalert2';

export  class Alert {
    success() {
        swal({
            title: 'Great!',
            text: 'Your work has been saved!',
            type: 'success',
            width: '300px',
            showConfirmButton: false,
            timer: 1500
        });
    }
    
     error() {
        swal({
            title: 'Oops...',
            text: 'Something went wrong!',
            type: 'error',
            width: '300px',
            showConfirmButton: false,
        });
    }

}
 

