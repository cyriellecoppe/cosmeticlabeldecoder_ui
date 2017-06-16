import React from 'react'


function ListRenderer(props) {
    return (
        <li><a href={props.url} target="_blank" rel="noopener noreferrer">
            {props.name}
            <i
                className="fa fa-external-link"
                aria-hidden="true"
                title="External Link"
            ></i>
        </a></li>
    )
}


export default function RelatedLinks(props) {
    return (
        <div className="col-md-12">
            <div className="row">
            <div className="col-md-12" id="links">
                <h1>Related links</h1>
                <h4>Images</h4>
            </div>
            <div className="col-md-6">
                <p className="text-muted">Blog</p>
                <ul>
                    <ListRenderer
                        url='http://micheliaorganic.com/organic-products/'
                        name='Placeholder - Creams'
                    />
                    <ListRenderer
                        url='http://www.thairefresh.ee/kontakt/'
                        name='Placeholder - DIY'
                    />
                    <ListRenderer
                        url='http://www.besthealthmag.ca/best-looks/beauty/how-do-i-know-if-a-product-is-really-natural-or-organic/'
                        name='Placeholder - Homecare'
                    />
                    <ListRenderer
                        url='http://www.cbc.ca/stevenandchris/life/natural-makeup-de-coded'
                        name='Placeholder - Makeup'
                    />
                    <ListRenderer
                        url='http://intreviews.com/natural-cosmetics-safe-use/'
                        name='Placeholder - Mint'
                    />
                    <ListRenderer
                        url='http://www.aparnatraders.in/herbal-beauty-products.htm'
                        name='Placeholder - Natural ingredients'
                    />
                    <ListRenderer
                        url='http://vrossis.com/natural-herbal-cosmetics-grid/'
                        name='Placeholder - Oil'
                    />
                    <ListRenderer
                        url='http://continuedinfos.blogspot.ca/2016/02/natural-cosmetics.html'
                        name='Placeholder - Packaging'
                    />
                    <ListRenderer
                        url='http://keywordsuggest.org/gallery/1262222.html'
                        name='Placeholder - Shampoo'
                    />
                    <ListRenderer
                        url='http://mhsitiger.com/features/2015/03/25/natural-beauty-products/'
                        name='Placeholder - Soap'
                    />
                </ul>
            </div>
            <div className="col-md-6">
                <p className="text-muted">Static</p>
                <ul>
                    <ListRenderer
                        url='https://unsplash.com/'
                        name='Placeholder - unsplash.com'
                    />
                    <ListRenderer
                        url='https://pixabay.com/'
                        name='Placeholder - pixabay.com'
                    />
                    <ListRenderer
                        url='https://www.iconfinder.com/icons/219733/label_price_price_tag_shopping_tag_icon'
                        name='Placeholder - CLD logo'
                    />
                </ul>
            </div>
            <div className="col-md-6">
                <p className="text-muted">Products</p>
                <ul>
                    <ListRenderer
                        url='https://www.google.ca/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwinyeuWp_rTAhVP2WMKHfrHDygQjhwIBQ&url=http%3A%2F%2Fwww.chanel.com%2Fen_US%2Ffragrance-beauty%2Ffragrance-allure-homme-88359&psig=AFQjCNEAg3yAQbBBS0eBzK2kiLYe44wjcQ&ust=1495226556613174'
                        name='Placeholder - Chanel'
                    />
                    <ListRenderer
                        url='https://www.clarins.ca/en/moisture-replenishing-lip-balm/C010302006.html'
                        name='Placeholder - Clarins'
                    />
                    <ListRenderer
                        url='https://www.dr.hauschka.com/en_DE/products/soothing-cleansing-milk/#2'
                        name='Placeholder - Dr Hauschka'
                    />
                    <ListRenderer
                        url='https://www.lavera.com/basis-moisturizing-body-lotion-106044.html'
                        name='Placeholder - Lavera'
                    />
                    <ListRenderer
                        url='http://www.lushusa.com/face/color-essentials/dark-pink/03072.html'
                        name='Placeholder - Lush'
                    />
                    <ListRenderer
                        url='http://usa.weleda.com/our-products/shop/shaving-cream.aspx'
                        name='Placeholder - Weleda - shaving'
                    />
                    <ListRenderer
                        url='http://usa.weleda.com/our-products/shop/9651.aspx'
                        name='Placeholder - Weleda - body'
                    />
                </ul>
            </div>
            <div className="col-md-6">
                <p className="text-muted">Certifications</p>
                <ul>
                    <ListRenderer
                        url='http://www.kontrollierte-naturkosmetik.de/e/bdih.htm'
                        name='Placeholder - BDIH'
                    />
                    <ListRenderer
                        url='http://blog.organogold.com/og_health/the-ecocert-seal-of-approval'
                        name='Placeholder - ECOCERT'
                    />
                    <ListRenderer
                        url='http://www.natrue.org/'
                        name='Placeholder - NATRUE'
                    />
                    <ListRenderer
                        url='http://organicrules.org/1819/'
                        name='Placeholder - SOIL ASSOCIATION'
                    />
                </ul>
            </div>
            <div className="col-md-12">
                <h4>UI and content</h4>
                <ul>
                    <ListRenderer
                        url='https://fablenaturals.com/'
                        name='fablenaturals.com'
                    />
                    <ListRenderer
                        url='http://laveritesurlescosmetiques.com/'
                        name='laveritesurlescosmetiques.com'
                    />
                    <ListRenderer
                        url='http://leflacon.free.fr/'
                        name='leflacon.free.fr'
                    />
                </ul>
            </div>
        </div>
        </div>
    )
}
