let apiUrl = 'http://localhost:5005/api/';

class TatApi {

    getProfile(id) {
        var url = apiUrl + 'profile/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getProfileList() {
        var url = apiUrl + 'profile';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    getProfileByOrganization(id) {
        var url = apiUrl + 'profileByOrganization/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }


    deleteProfile(id) {
        var url = apiUrl + 'profile/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateProfile(data) {
        var url = apiUrl + 'profile/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createProfile(data) {
        var url = apiUrl + 'profile';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    getAdvertiserList() {
        var url = apiUrl + 'advertiser';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    getAdvertiser(id) {
        var url = apiUrl + 'advertiser/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    // getAdvertiserByOrganization(id) {
    //     var url = apiUrl + 'advertiserByOrganization/';
    //     return api.call('get', url + id)
    //         .then(({ data }) => {
    //             return data
    //         });
    // }

    deleteAdvertiser(id) {
        var url = apiUrl + 'advertiser/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateAdvertiser(data) {
        var url = apiUrl + 'advertiser/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createAdvertiser(data) {
        var url = apiUrl + 'advertiser';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    getAudience(id) {
        var url = apiUrl + 'audience/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getAudienceList() {
        var url = apiUrl + 'audience';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    deleteAudience(id) {
        var url = apiUrl + 'audience/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateAudience(data) {
        var url = apiUrl + 'audience/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createAudience(data) {
        var url = apiUrl + 'audience';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    getCampaign(id) {
        var url = apiUrl + 'campaign/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getCampaignList() {
        var url = apiUrl + 'campaign';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    deleteCampaign(id) {
        var url = apiUrl + 'campaign/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateCampaign(data) {
        var url = apiUrl + 'campaign/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }


    createCampaign(data) {
        var url = apiUrl + 'campaign';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }


    getBusiness(id) {
        var url = apiUrl + 'business/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getBusinessList() {
        var url = apiUrl + 'business';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    deleteBusiness(id) {
        var url = apiUrl + 'business/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateBusiness(data) {
        var url = apiUrl + 'business/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createBusiness(data) {
        var url = apiUrl + 'business';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }


    getAdsImageList() {
        var url = apiUrl + 'ads';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    getAdsImageListByAdvertiser(id) {
        var url = apiUrl + '/ads/byAdvertiser/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getAdsImage(id) {
        var url = apiUrl + 'ads/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }
    getAdsImageUrl(id) {
        var url = apiUrl + 'ads/image/';
        return url + id;
        // return api.call('get', url + id)
        //     .then(({ data }) => {
        //         return data
        //     });
    }

    deleteAdsImage(id) {
        var url = apiUrl + 'ads/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateAdsImage(data) {
        var url = apiUrl + 'ads/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createAdsImage(data) {
        var url = apiUrl + 'ads';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    getActivityList() {
        var url = apiUrl + 'activity';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    getActivity(id) {
        var url = apiUrl + 'activity/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getActivityByOrganization(id) {
        var url = apiUrl + 'activityByOrganization/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }


    deleteActivity(id) {
        var url = apiUrl + 'activity/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateActivity(data) {
        var url = apiUrl + 'activity/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createActivity(data) {
        var url = apiUrl + 'activity';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    getProductList() {
        var url = apiUrl + 'product';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    getProduct(id) {
        var url = apiUrl + 'product/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }
    deleteProduct(id) {
        var url = apiUrl + 'product/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateProduct(data) {
        var url = apiUrl + 'product/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createProduct(data) {
        var url = apiUrl + 'product';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }


    getCategoryList() {
        var url = apiUrl + 'category';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    getCategory(id) {
        var url = apiUrl + 'category/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    deleteCategory(id) {
        var url = apiUrl + 'category/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateCategory(data) {
        var url = apiUrl + 'category/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createCategory(data) {
        var url = apiUrl + 'category';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    getCertificationList() {
        var url = apiUrl + 'certification';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    getCertification(id) {
        var url = apiUrl + 'certification/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }
    deleteCertification(id) {
        var url = apiUrl + 'certification/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateCertification(data) {
        var url = apiUrl + 'certification/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createCertification(data) {
        var url = apiUrl + 'certification';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    createTrail(data) {
        var url = apiUrl + 'trail';
        return api.call('post', url, data)
            .then(({ data }) => {
                console.log(data)
                return data
            });

    }

    getTrailList() {
        var url = apiUrl + 'trail';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    getProductTrail(id) {
        var url = apiUrl + 'trail/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    getQrImage(id) {
        var url = apiUrl + 'generateQr/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }

    //User
    getUserList() {
        var url = apiUrl + 'auth';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    getUser(id) {
        var url = apiUrl + 'auth/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }
    deleteUser(id) {
        var url = apiUrl + 'auth/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    updateUser(data) {
        var url = apiUrl + 'auth/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }

    createUser(data) {
        var url = apiUrl + 'auth';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }
}

export default TatApi;