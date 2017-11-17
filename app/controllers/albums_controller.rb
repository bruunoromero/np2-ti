class AlbumsController < ApplicationController
    before_action :set_album, only: [:show]

    def index
        albums1 = Album.limit(5)
        albums2 = Album.limit(5).offset(5)
        albums3 = Album.limit(5).offset(10)
        albums4 = Album.limit(5).offset(15)
        albums5 = Album.limit(5).offset(20)

        section1 = { title: 'Best Sellers', albums: albums1 }
        section2 = { title: 'Our Favorites', albums: albums2 }
        section3 = { title: 'Deals of the Day', albums: albums3 }
        section4 = { title: 'Populars', albums: albums4 }
        section5 = { title: 'New Releases', albums: albums5 }

        render json: [section1, section2, section3, section4, section5]
    end

    def show
        render json: @album, include: :tracks
    end

    private
    def set_album
        @album = Album.find(params[:id])
    end
end